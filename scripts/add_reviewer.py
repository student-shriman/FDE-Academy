import os
import hashlib
import psycopg
from psycopg.rows import dict_row
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(BASE_DIR, "server", ".env")
load_dotenv(ENV_PATH)

DATABASE_URL = os.getenv("DATABASE_URL")

def hash_password(password: str) -> str:
    salt = os.urandom(16).hex()
    key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000)
    return f"{salt}${key.hex()}"

def main():
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL not found in server/.env")
    
    pwd_hash = hash_password("Academy@2026")
    
    conn = psycopg.connect(DATABASE_URL, row_factory=dict_row)
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO users (name, identifier, auth_type, email, phone, role, password_hash, avatar_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (identifier) 
            DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, password_hash = EXCLUDED.password_hash
            RETURNING id, name, email, role;
        """, (
            "Tushar Vidyarthy",
            "tusharvidyarthiaem@gmail.com",
            "gmail",
            "tusharvidyarthiaem@gmail.com",
            None,
            "reviewer",
            pwd_hash,
            None
        ))
        user = cur.fetchone()
        print(f"Successfully processed user: {user['name']} ({user['email']}) -> Role: {user['role']}")
        
        cur.execute("""
            SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE((SELECT MAX(id) FROM users), 1));
        """)
        conn.commit()
        
        cur.execute("SELECT id, name, email, role FROM users ORDER BY id;")
        users = cur.fetchall()
        print("\nCurrent Users in Supabase Database:")
        for u in users:
            print(f"  ID {u['id']}: {u['name']} | {u['email']} | Role: {u['role']}")
            
    conn.close()

if __name__ == "__main__":
    main()
