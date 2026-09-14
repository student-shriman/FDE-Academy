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

def seed_rbac_users():
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL not found in server/.env")
    conn = psycopg.connect(DATABASE_URL, row_factory=dict_row)
    cursor = conn.cursor()
    
    print("Connecting to Supabase PostgreSQL...")
    
    # 1. Clear old user progress and user accounts
    cursor.execute("DELETE FROM user_progress")
    cursor.execute("DELETE FROM users")
    
    # 2. Seed default password: Academy@2026
    default_pwd_hash = hash_password("Academy@2026")
    
    users_to_seed = [
        {
            "name": "Shriman Narayan",
            "identifier": "student.shriman@gmail.com",
            "auth_type": "gmail",
            "email": "student.shriman@gmail.com",
            "phone": None,
            "role": "admin",
            "password_hash": default_pwd_hash,
            "avatar_url": None
        },
        {
            "name": "Shriman Nichols",
            "identifier": "shriman.nicholson@gmail.com",
            "auth_type": "gmail",
            "email": "shriman.nicholson@gmail.com",
            "phone": None,
            "role": "student",
            "password_hash": default_pwd_hash,
            "avatar_url": None
        },
        {
            "name": "Prince Sharma",
            "identifier": "princesharma1p7@gmail.com",
            "auth_type": "gmail",
            "email": "princesharma1p7@gmail.com",
            "phone": None,
            "role": "student",
            "password_hash": default_pwd_hash,
            "avatar_url": None
        },
        {
            "name": "Tushar Vidyarthy",
            "identifier": "tusharvidyarthiaem@gmail.com",
            "auth_type": "gmail",
            "email": "tusharvidyarthiaem@gmail.com",
            "phone": None,
            "role": "reviewer",
            "password_hash": default_pwd_hash,
            "avatar_url": None
        }
    ]
    
    for u in users_to_seed:
        cursor.execute(
            """
            INSERT INTO users (name, identifier, auth_type, email, phone, role, password_hash, avatar_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (u["name"], u["identifier"], u["auth_type"], u["email"], u["phone"], u["role"], u["password_hash"], u["avatar_url"])
        )
        print(f"Seeded user: {u['name']} ({u['email']}) as {u['role']}")
        
    cursor.execute("""
        SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE((SELECT MAX(id) FROM users), 1));
    """)
    conn.commit()
    
    # Verify seeded accounts
    cursor.execute("SELECT id, name, email, role FROM users")
    seeded = cursor.fetchall()
    print("\nCurrent users in Supabase database:")
    for row in seeded:
        print(f"  ID {row['id']}: {row['name']} | {row['email']} | Role: {row['role']}")
        
    conn.close()
    print("Database seeding completed successfully.")

if __name__ == "__main__":
    seed_rbac_users()
