import os
import sqlite3
import hashlib
import hmac
import re
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "curriculum.db")

app = FastAPI(title="AI Academy API", version="1.0.0")

# Enable CORS for Vite dev server and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

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

class UserResponse(BaseModel):
    id: int
    name: str
    identifier: str
    auth_type: str
    email: Optional[str] = None
    phone: Optional[str] = None
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
        (payload.name.strip(), identifier, auth_type, user_email, user_phone, pwd_hash, "Student")
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
            "role": "Forward Deployed Engineer"
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
    
    return {
        "status": "success",
        "user": {
            "id": row["id"],
            "name": row["name"],
            "identifier": row["identifier"],
            "auth_type": row["auth_type"] or "gmail",
            "email": row["email"],
            "phone": row["phone"],
            "role": row["role"] or "Forward Deployed Engineer"
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
@app.get("/api/health")
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
