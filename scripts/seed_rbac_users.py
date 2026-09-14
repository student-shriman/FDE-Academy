import os
import sqlite3
import hashlib

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "curriculum.db")

def hash_password(password: str) -> str:
    salt = os.urandom(16).hex()
    key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000)
    return f"{salt}${key.hex()}"

def seed_rbac_users():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    print(f"Connecting to database at {DB_PATH}...")
    
    # 1. Clear old user progress and user accounts
    cursor.execute("DELETE FROM user_progress")
    cursor.execute("DELETE FROM users")
    
    # Reset sqlite_sequence for clean IDs
    cursor.execute("DELETE FROM sqlite_sequence WHERE name IN ('users', 'user_progress')")
    
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
        }
    ]
    
    for u in users_to_seed:
        cursor.execute(
            """
            INSERT INTO users (name, identifier, auth_type, email, phone, role, password_hash, avatar_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (u["name"], u["identifier"], u["auth_type"], u["email"], u["phone"], u["role"], u["password_hash"], u["avatar_url"])
        )
        print(f"Seeded user: {u['name']} ({u['email']}) as {u['role']}")
        
    conn.commit()
    
    # Verify seeded accounts
    seeded = cursor.execute("SELECT id, name, email, role FROM users").fetchall()
    print("\nCurrent users in database:")
    for row in seeded:
        print(f"  ID {row[0]}: {row[1]} | {row[2]} | Role: {row[3]}")
        
    conn.close()
    print("Database seeding completed successfully.")

if __name__ == "__main__":
    seed_rbac_users()
