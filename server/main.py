import os
import hashlib
import hmac
import re
import httpx
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import dict_row

app = FastAPI(title="AI Academy API", version="1.0.0")

# Enable CORS for Vite dev server and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(ENV_PATH)

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL must be configured in server/.env for Supabase Cloud PostgreSQL.")

# Initialize high-performance PostgreSQL connection pool
db_pool = ConnectionPool(
    DATABASE_URL,
    min_size=1,
    max_size=10,
    kwargs={"row_factory": dict_row}
)
print("Connected to Supabase Cloud PostgreSQL with psycopg3 pool.")

class RowWrapper:
    def __init__(self, data: dict):
        self._data = data or {}
        self._keys = list(self._data.keys())
        self._values = list(self._data.values())

    def __getitem__(self, key):
        if isinstance(key, int):
            return self._values[key]
        return self._data[key]

    def get(self, key, default=None):
        return self._data.get(key, default)

    def keys(self):
        return self._data.keys()

    def values(self):
        return self._data.values()

    def items(self):
        return self._data.items()

    def __iter__(self):
        return iter(self._values)

    def __contains__(self, key):
        return key in self._data

    def __repr__(self):
        return repr(self._data)

class DBCursorWrapper:
    def __init__(self, raw_cur):
        self._cur = raw_cur
        self.lastrowid = None

    def execute(self, sql: str, params: tuple = None):
        sql_clean = sql.replace("?", "%s").strip().rstrip(";")
        is_insert = sql_clean.strip().upper().startswith("INSERT INTO") and "RETURNING" not in sql_clean.upper()
        if is_insert:
            sql_clean += " RETURNING id"
            if params is not None:
                self._cur.execute(sql_clean, params)
            else:
                self._cur.execute(sql_clean)
            row = self._cur.fetchone()
            if row and "id" in row:
                self.lastrowid = row["id"]
        else:
            if params is not None:
                self._cur.execute(sql_clean, params)
            else:
                self._cur.execute(sql_clean)
        return self

    def fetchone(self):
        row = self._cur.fetchone()
        if row is None:
            return None
        return RowWrapper(row)

    def fetchall(self):
        rows = self._cur.fetchall()
        return [RowWrapper(r) for r in rows]

    def close(self):
        try:
            self._cur.close()
        except Exception:
            pass

class DBConnectionWrapper:
    def __init__(self, raw_conn, pool):
        self.raw_conn = raw_conn
        self.pool = pool

    def cursor(self):
        return DBCursorWrapper(self.raw_conn.cursor())

    def commit(self):
        self.raw_conn.commit()

    def rollback(self):
        self.raw_conn.rollback()

    def close(self):
        if self.pool:
            try:
                self.pool.putconn(self.raw_conn)
            except Exception:
                pass
        else:
            try:
                self.raw_conn.close()
            except Exception:
                pass

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            try:
                self.rollback()
            except Exception:
                pass
        else:
            try:
                self.commit()
            except Exception:
                pass
        self.close()

def get_db():
    conn = db_pool.getconn()
    return DBConnectionWrapper(conn, pool=db_pool)

def init_db():
    """Ensure database schema includes required PostgreSQL tables and columns."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            identifier TEXT UNIQUE NOT NULL,
            auth_type TEXT NOT NULL DEFAULT 'gmail',
            email TEXT,
            phone TEXT,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'student',
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            google_id TEXT,
            avatar_url TEXT
        );
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user_progress (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            subtopic_id TEXT NOT NULL,
            chapter_id TEXT,
            completed INTEGER DEFAULT 1,
            completed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, subtopic_id)
        );
    """)
    conn.commit()
    conn.close()

init_db()

# Password hashing utilities using standard library hashlib
def hash_password(password: str) -> str:
    salt = os.urandom(16).hex()
    key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000)
    return f"{salt}${key.hex()}"

def verify_password(password: str, hashed: str) -> bool:
    try:
        salt, key = hashed.split("$")
        computed = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000).hex()
        return hmac.compare_digest(computed, key)
    except Exception:
        return False

# Pydantic Schemas
class SignUpRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    auth_type: str = Field(default="gmail", description="'gmail' or 'phone'")
    email: Optional[str] = None
    phone: Optional[str] = None
    country_code: Optional[str] = None
    phone_number: Optional[str] = None
    identifier: Optional[str] = None
    password: str = Field(..., min_length=6)

class SignInRequest(BaseModel):
    identifier: Optional[str] = None
    email: Optional[str] = None
    password: str = Field(..., min_length=1)

class GoogleAuthRequest(BaseModel):
    credential: str = Field(..., description="Google ID Token JWT")
    client_id: Optional[str] = None

class UpdateRoleRequest(BaseModel):
    admin_user_id: int
    role: str = Field(..., description="'admin', 'reviewer', or 'student'")

class UserResponse(BaseModel):
    id: int
    name: str
    identifier: str
    auth_type: str
    email: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    role: str

class ToggleProgressRequest(BaseModel):
    user_id: int
    subtopic_id: str
    chapter_id: Optional[str] = None

# --- AUTH ENDPOINTS ---

@app.post("/api/auth/signup", status_code=status.HTTP_201_CREATED)
def sign_up(payload: SignUpRequest):
    auth_type = payload.auth_type.strip().lower() if payload.auth_type else "gmail"
    
    # Check if incoming request is phone-based
    if auth_type == "phone" or payload.phone or payload.phone_number:
        auth_type = "phone"
        if payload.country_code and payload.phone_number:
            code = payload.country_code.strip()
            num = payload.phone_number.strip()
            raw_phone = f"{code}{num}"
        else:
            raw_phone = (payload.phone or payload.identifier or "").strip()
            
        clean_phone = re.sub(r"[\s\-\(\)\.]", "", raw_phone)
        if not clean_phone.startswith("+"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number must include country code starting with '+' (e.g. +91 9876543210 or +1 4155552671)."
            )
        
        if not re.match(r"^\+[1-9]\d{7,14}$", clean_phone):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Please provide a valid phone number with country code (e.g. +91 9876543210)."
            )
        
        identifier = clean_phone
        user_email = None
        user_phone = clean_phone
    else:
        # Default to Gmail validation
        auth_type = "gmail"
        raw_email = (payload.email or payload.identifier or "").strip().lower()
        if not raw_email or not re.match(r"^[a-zA-Z0-9._%+-]+@(?:gmail\.com|googlemail\.com)$", raw_email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sign up requires a valid Gmail address (e.g. yourname@gmail.com)."
            )
        
        identifier = raw_email
        user_email = raw_email
        user_phone = None

    conn = get_db()
    cursor = conn.cursor()
    
    # Check duplicate identifier or email or phone
    cursor.execute(
        "SELECT id FROM users WHERE identifier = ? OR (email IS NOT NULL AND email = ?) OR (phone IS NOT NULL AND phone = ?)",
        (identifier, identifier, identifier)
    )
    if cursor.fetchone():
        conn.close()
        err_msg = "An account with this Gmail address already exists." if auth_type == "gmail" else "An account with this phone number already exists."
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=err_msg
        )
    
    pwd_hash = hash_password(payload.password)
    cursor.execute(
        """
        INSERT INTO users (name, identifier, auth_type, email, phone, password_hash, role)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (payload.name.strip(), identifier, auth_type, user_email, user_phone, pwd_hash, "student")
    )
    user_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return {
        "status": "success",
        "user": {
            "id": user_id,
            "name": payload.name.strip(),
            "identifier": identifier,
            "auth_type": auth_type,
            "email": user_email,
            "phone": user_phone,
            "role": "student"
        }
    }

@app.post("/api/auth/signin")
def sign_in(payload: SignInRequest):
    raw_ident = (payload.identifier or payload.email or "").strip()
    if not raw_ident:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please provide your Gmail address or registered phone number."
        )

    conn = get_db()
    cursor = conn.cursor()
    
    if "@" in raw_ident:
        target_ident = raw_ident.lower()
        cursor.execute(
            """
            SELECT id, name, identifier, auth_type, email, phone, password_hash, role
            FROM users
            WHERE identifier = ? OR email = ?
            """,
            (target_ident, target_ident)
        )
    else:
        clean_phone = re.sub(r"[\s\-\(\)\.]", "", raw_ident)
        alt_phone = ("+" + clean_phone.lstrip("+")) if not clean_phone.startswith("+") else clean_phone.lstrip("+")
        cursor.execute(
            """
            SELECT id, name, identifier, auth_type, email, phone, password_hash, role
            FROM users
            WHERE identifier = ? OR phone = ? OR identifier = ? OR phone = ?
            """,
            (clean_phone, clean_phone, alt_phone, alt_phone)
        )
        
    row = cursor.fetchone()
    conn.close()
    
    if not row or not verify_password(payload.password, row["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials. Please verify your Gmail/phone and password."
        )
    
    avatar = row["avatar_url"] if "avatar_url" in row.keys() else None
    return {
        "status": "success",
        "user": {
            "id": row["id"],
            "name": row["name"],
            "identifier": row["identifier"],
            "auth_type": row["auth_type"] or "gmail",
            "email": row["email"],
            "phone": row["phone"],
            "avatar_url": avatar,
            "role": (row["role"] or "student").lower()
        }
    }

@app.post("/api/auth/google")
async def google_auth(payload: GoogleAuthRequest):
    credential = payload.credential.strip()
    if not credential:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing Google credential token."
        )
    
    user_info = None
    
    # Dev / Demo mode support for testing without client ID
    if credential.startswith("demo_"):
        user_info = {
            "sub": "demo_google_998877",
            "email": "google.engineer@gmail.com",
            "name": "Google AI Engineer",
            "picture": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
        }
    else:
        # Validate with Google tokeninfo service
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={credential}")
                if res.status_code != 200:
                    err_msg = "Invalid or expired Google token."
                    try:
                        err_json = res.json()
                        err_msg = err_json.get("error_description", err_json.get("error", err_msg))
                    except Exception:
                        pass
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail=f"Google authentication failed: {err_msg}"
                    )
                user_info = res.json()
        except HTTPException:
            raise
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Unable to connect to Google verification service: {exc}"
            )
            
    if not user_info or not user_info.get("email"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google profile did not provide a verified email."
        )

    google_id = user_info.get("sub")
    email = user_info.get("email").strip().lower()
    name = user_info.get("name", "").strip() or email.split("@")[0]
    avatar_url = user_info.get("picture")

    conn = get_db()
    cursor = conn.cursor()

    # Check if user already exists by google_id OR by email
    cursor.execute(
        """
        SELECT id, name, identifier, auth_type, email, phone, avatar_url, role
        FROM users
        WHERE (google_id IS NOT NULL AND google_id = ?) OR (email IS NOT NULL AND email = ?)
        """,
        (google_id, email)
    )
    existing = cursor.fetchone()

    if existing:
        user_id = existing["id"]
        # Link google_id and update avatar_url if newly available
        cursor.execute(
            """
            UPDATE users 
            SET google_id = COALESCE(google_id, ?),
                avatar_url = COALESCE(?, avatar_url)
            WHERE id = ?
            """,
            (google_id, avatar_url, user_id)
        )
        conn.commit()
        
        user_role = (existing["role"] or "student").lower()
        final_user = {
            "id": user_id,
            "name": existing["name"] or name,
            "identifier": existing["identifier"] or email,
            "auth_type": "google",
            "email": existing["email"] or email,
            "phone": existing["phone"],
            "avatar_url": avatar_url or existing["avatar_url"],
            "role": user_role
        }
        conn.close()
        return {"status": "success", "user": final_user}
    else:
        # Create brand new user via Google SSO with non-guessable SSO sentinel hash and role 'student'
        sso_dummy_hash = f"SSO_GOOGLE_{os.urandom(16).hex()}"
        cursor.execute(
            """
            INSERT INTO users (name, identifier, auth_type, email, google_id, avatar_url, password_hash, role)
            VALUES (?, ?, 'google', ?, ?, ?, ?, 'student')
            """,
            (name, email, email, google_id, avatar_url, sso_dummy_hash)
        )
        user_id = cursor.lastrowid
        conn.commit()
        conn.close()

        return {
            "status": "success",
            "user": {
                "id": user_id,
                "name": name,
                "identifier": email,
                "auth_type": "google",
                "email": email,
                "phone": None,
                "avatar_url": avatar_url,
                "role": "student"
            }
        }

# --- COVERAGE & PROGRESS ENDPOINTS ---

def compute_user_metrics(user_id: int):
    conn = get_db()
    cursor = conn.cursor()
    
    # Total curriculum subtopics and hours
    cursor.execute("SELECT count(*), coalesce(sum(hours), 0) FROM subtopics")
    total_subtopics, total_hours = cursor.fetchone()
    
    # Total Phase 0 subtopics and hours
    cursor.execute("SELECT count(*), coalesce(sum(hours), 0) FROM subtopics WHERE phase_id = 'P0'")
    p0_subtopics, p0_hours = cursor.fetchone()
    
    # User completed subtopics
    cursor.execute("""
        SELECT up.subtopic_id, up.chapter_id, s.phase_id, coalesce(s.hours, 0)
        FROM user_progress up
        JOIN subtopics s ON up.subtopic_id = s.subtopic_id
        WHERE up.user_id = ? AND up.completed = 1
    """, (user_id,))
    
    rows = cursor.fetchall()
    conn.close()
    
    completed_sub_ids = [r[0] for r in rows]
    completed_chapter_ids = [r[1] for r in rows if r[1]]
    
    completed_hours = sum(r[3] for r in rows)
    p0_completed_count = sum(1 for r in rows if r[2] == 'P0')
    
    overall_percentage = round((len(completed_sub_ids) / total_subtopics * 100), 1) if total_subtopics else 0.0
    p0_percentage = round((p0_completed_count / p0_subtopics * 100), 1) if p0_subtopics else 0.0
    
    return {
        "completed_subtopics": completed_sub_ids,
        "completed_chapters": completed_chapter_ids,
        "total_completed": len(completed_sub_ids),
        "total_subtopics": total_subtopics,
        "overall_percentage": overall_percentage,
        "p0_completed_count": p0_completed_count,
        "p0_total_subtopics": p0_subtopics,
        "p0_percentage": p0_percentage,
        "completed_hours": round(completed_hours, 1),
        "total_hours": round(total_hours, 1)
    }

@app.get("/api/progress")
def get_progress(user_id: int = Query(...)):
    return compute_user_metrics(user_id)

@app.post("/api/progress/toggle")
def toggle_progress(payload: ToggleProgressRequest):
    conn = get_db()
    cursor = conn.cursor()
    
    # Check if subtopic_id exists in user_progress
    cursor.execute(
        "SELECT id, completed FROM user_progress WHERE user_id = ? AND subtopic_id = ?",
        (payload.user_id, payload.subtopic_id)
    )
    row = cursor.fetchone()
    
    if row:
        new_state = 0 if row["completed"] == 1 else 1
        cursor.execute(
            "UPDATE user_progress SET completed = ?, completed_at = CURRENT_TIMESTAMP WHERE id = ?",
            (new_state, row["id"])
        )
    else:
        cursor.execute(
            "INSERT INTO user_progress (user_id, subtopic_id, chapter_id, completed) VALUES (?, ?, ?, 1)",
            (payload.user_id, payload.subtopic_id, payload.chapter_id)
        )
    
    conn.commit()
    conn.close()
    
    # Return updated metrics immediately
    return compute_user_metrics(payload.user_id)

# --- ADMIN RBAC ENDPOINTS ---

def verify_admin(user_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, role FROM users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. User account required."
        )

@app.get("/api/admin/users")
def get_admin_users(admin_user_id: int = Query(...)):
    verify_admin(admin_user_id)
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT u.id, u.name, u.identifier, u.auth_type, u.email, u.phone, 
               u.avatar_url, LOWER(COALESCE(u.role, 'student')) as role, u.created_at,
               COUNT(p.subtopic_id) as completed_subtopics
        FROM users u
        LEFT JOIN user_progress p ON u.id = p.user_id AND p.completed = 1
        GROUP BY u.id
        ORDER BY u.id ASC
        """
    )
    rows = cursor.fetchall()
    conn.close()
    users_list = []
    for r in rows:
        users_list.append({
            "id": r["id"],
            "name": r["name"],
            "identifier": r["identifier"],
            "auth_type": r["auth_type"] or "gmail",
            "email": r["email"],
            "phone": r["phone"],
            "avatar_url": r["avatar_url"],
            "role": r["role"],
            "created_at": str(r["created_at"]) if r["created_at"] else None,
            "completed_subtopics": r["completed_subtopics"]
        })
    return {"status": "success", "users": users_list}

@app.put("/api/admin/users/{target_user_id}/role")
def update_user_role(target_user_id: int, payload: UpdateRoleRequest):
    verify_admin(payload.admin_user_id)
    new_role = payload.role.strip().lower()
    if new_role not in ["admin", "reviewer", "student"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role. Permitted roles are 'admin', 'reviewer', or 'student'."
        )
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, role FROM users WHERE id = ?", (target_user_id,))
    target = cursor.fetchone()
    if not target:
        conn.close()
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Target user not found.")
        
    # Prevent demoting the last remaining admin
    if (target["role"] or "").lower() == "admin" and new_role != "admin":
        cursor.execute("SELECT count(*) FROM users WHERE LOWER(role) = 'admin'")
        admin_count = cursor.fetchone()[0]
        if admin_count <= 1:
            conn.close()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot demote the last remaining administrator."
            )
            
    cursor.execute("UPDATE users SET role = ? WHERE id = ?", (new_role, target_user_id))
    conn.commit()
    conn.close()
    return {"status": "success", "user_id": target_user_id, "role": new_role}

@app.delete("/api/admin/users/{target_user_id}")
def delete_user(target_user_id: int, admin_user_id: int = Query(...)):
    verify_admin(admin_user_id)
    if admin_user_id == target_user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Administrators cannot delete their own active account."
        )
        
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, role FROM users WHERE id = ?", (target_user_id,))
    target = cursor.fetchone()
    if not target:
        conn.close()
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Target user not found.")
        
    # Delete progress and user
    cursor.execute("DELETE FROM user_progress WHERE user_id = ?", (target_user_id,))
    cursor.execute("DELETE FROM users WHERE id = ?", (target_user_id,))
    conn.commit()
    conn.close()
    return {"status": "success", "deleted_user_id": target_user_id}

@app.get("/api/admin/stats")
def get_admin_stats(admin_user_id: int = Query(...)):
    verify_admin(admin_user_id)
    conn = get_db()
    cursor = conn.cursor()
    total_users = cursor.execute("SELECT count(*) FROM users").fetchone()[0]
    total_admins = cursor.execute("SELECT count(*) FROM users WHERE LOWER(role) = 'admin'").fetchone()[0]
    total_reviewers = cursor.execute("SELECT count(*) FROM users WHERE LOWER(role) = 'reviewer'").fetchone()[0]
    total_students = cursor.execute("SELECT count(*) FROM users WHERE LOWER(role) = 'student'").fetchone()[0]
    total_completions = cursor.execute("SELECT count(*) FROM user_progress WHERE completed = 1").fetchone()[0]
    conn.close()
    return {
        "status": "success",
        "total_users": total_users,
        "admins": total_admins,
        "reviewers": total_reviewers,
        "students": total_students,
        "total_completions": total_completions
    }

@app.get("/api/health")
@app.get("/status")
def health_check():
    return {"status": "healthy", "service": "fde-academy-backend"}

# --- STATIC SPA SERVING FOR PRODUCTION (Render) ---
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

DIST_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "web", "dist")

if os.path.exists(DIST_DIR):
    assets_dir = os.path.join(DIST_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="API route not found")
        file_path = os.path.join(DIST_DIR, full_path)
        if full_path and os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        index_file = os.path.join(DIST_DIR, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return {"status": "Building frontend..."}
