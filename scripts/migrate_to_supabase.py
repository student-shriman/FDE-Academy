import os
import sqlite3
import psycopg
from psycopg.rows import dict_row
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SQLITE_DB = os.path.join(BASE_DIR, "curriculum.db")
ENV_FILE = os.path.join(BASE_DIR, "server", ".env")

load_dotenv(ENV_FILE)
SUPABASE_URL = os.getenv("DATABASE_URL")

if not SUPABASE_URL:
    raise ValueError(f"DATABASE_URL not found in {ENV_FILE}")

def run_migration():
    print(f"Connecting to SQLite: {SQLITE_DB}")
    sqlite_conn = sqlite3.connect(SQLITE_DB)
    sqlite_conn.row_factory = sqlite3.Row
    sqlite_cur = sqlite_conn.cursor()

    print(f"Connecting to Supabase PostgreSQL...")
    pg_conn = psycopg.connect(SUPABASE_URL, row_factory=dict_row, autocommit=False)
    pg_cur = pg_conn.cursor()

    try:
        print("\n--- 1. Creating PostgreSQL Tables in Supabase ---")
        
        # 1. phases
        pg_cur.execute("""
            CREATE TABLE IF NOT EXISTS phases (
                phase_id TEXT PRIMARY KEY,
                phase_number INTEGER,
                name TEXT NOT NULL,
                weeks TEXT NOT NULL,
                description TEXT,
                primary_deliverable TEXT
            );
        """)

        # 2. topics
        pg_cur.execute("""
            CREATE TABLE IF NOT EXISTS topics (
                topic_id TEXT PRIMARY KEY,
                phase_id TEXT NOT NULL REFERENCES phases(phase_id) ON DELETE CASCADE,
                topic_code TEXT,
                topic_name TEXT NOT NULL,
                week TEXT,
                order_index INTEGER
            );
        """)

        # 3. subtopics
        pg_cur.execute("""
            CREATE TABLE IF NOT EXISTS subtopics (
                subtopic_id TEXT PRIMARY KEY,
                topic_id TEXT NOT NULL REFERENCES topics(topic_id) ON DELETE CASCADE,
                phase_id TEXT NOT NULL REFERENCES phases(phase_id) ON DELETE CASCADE,
                order_index INTEGER,
                name TEXT NOT NULL,
                details TEXT,
                hours NUMERIC,
                track TEXT,
                chapter_id TEXT,
                has_content INTEGER DEFAULT 0
            );
        """)

        # 4. deliverables
        pg_cur.execute("""
            CREATE TABLE IF NOT EXISTS deliverables (
                id SERIAL PRIMARY KEY,
                project_name TEXT NOT NULL,
                target_weeks TEXT,
                phase_id TEXT,
                scope TEXT,
                portfolio_evidence TEXT,
                status TEXT DEFAULT 'Not Started'
            );
        """)

        # 5. weekly_roadmap
        pg_cur.execute("""
            CREATE TABLE IF NOT EXISTS weekly_roadmap (
                week_number INTEGER PRIMARY KEY,
                phase_id TEXT,
                focus TEXT,
                coverage TEXT,
                deliverable TEXT
            );
        """)

        # 6. chapters
        pg_cur.execute("""
            CREATE TABLE IF NOT EXISTS chapters (
                chapter_id TEXT PRIMARY KEY,
                phase_id TEXT NOT NULL,
                topic_id TEXT,
                chapter_number TEXT,
                title TEXT NOT NULL,
                track TEXT,
                html_content TEXT
            );
        """)

        # 7. users
        pg_cur.execute("""
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

        # 8. user_progress
        pg_cur.execute("""
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

        print("All PostgreSQL tables verified/created.")

        print("\n--- 2. Migrating Data from SQLite to Supabase ---")

        # Define tables and their column mappings in order of foreign key dependency
        tables = [
            ("phases", ["phase_id", "phase_number", "name", "weeks", "description", "primary_deliverable"]),
            ("topics", ["topic_id", "phase_id", "topic_code", "topic_name", "week", "order_index"]),
            ("subtopics", ["subtopic_id", "topic_id", "phase_id", "order_index", "name", "details", "hours", "track", "chapter_id", "has_content"]),
            ("deliverables", ["id", "project_name", "target_weeks", "phase_id", "scope", "portfolio_evidence", "status"]),
            ("weekly_roadmap", ["week_number", "phase_id", "focus", "coverage", "deliverable"]),
            ("chapters", ["chapter_id", "phase_id", "topic_id", "chapter_number", "title", "track", "html_content"]),
            ("users", ["id", "name", "identifier", "auth_type", "email", "phone", "password_hash", "role", "created_at", "google_id", "avatar_url"]),
            ("user_progress", ["id", "user_id", "subtopic_id", "chapter_id", "completed", "completed_at"])
        ]

        for table_name, cols in tables:
            # Fetch from SQLite
            sqlite_cur.execute(f"SELECT {', '.join(cols)} FROM {table_name}")
            rows = sqlite_cur.fetchall()
            
            if not rows:
                print(f"  Table '{table_name}': 0 rows in SQLite, skipping.")
                continue

            # Clear target table in PostgreSQL to ensure clean initial sync
            pg_cur.execute(f"DELETE FROM {table_name}")
            
            # Prepare PostgreSQL insert query
            col_list = ", ".join(cols)
            placeholders = ", ".join(["%s"] * len(cols))
            insert_query = f"INSERT INTO {table_name} ({col_list}) VALUES ({placeholders})"

            data_tuples = [tuple(r[c] for c in cols) for r in rows]
            pg_cur.executemany(insert_query, data_tuples)
            print(f"  Migrated {len(data_tuples)} rows into '{table_name}'")

        print("\n--- 3. Synchronizing PostgreSQL Sequences ---")
        for seq_table in ["users", "deliverables", "user_progress"]:
            pg_cur.execute(f"""
                SELECT setval(
                    pg_get_serial_sequence('{seq_table}', 'id'),
                    COALESCE((SELECT MAX(id) FROM {seq_table}), 1)
                );
            """)
            print(f"  Synchronized sequence for table '{seq_table}'")

        pg_conn.commit()
        print("\nMigration committed successfully!")

        print("\n--- 4. Verification Check on Supabase ---")
        for table_name, _ in tables:
            pg_cur.execute(f"SELECT count(*) as count FROM {table_name}")
            cnt = pg_cur.fetchone()["count"]
            print(f"  Supabase '{table_name}': {cnt} rows")

    except Exception as e:
        pg_conn.rollback()
        print(f"\nMigration failed with error: {e}")
        raise
    finally:
        sqlite_conn.close()
        pg_conn.close()

if __name__ == "__main__":
    run_migration()
