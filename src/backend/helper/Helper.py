import sqlite3
import bcrypt

def _get_ProgramDB_Connection():
    return sqlite3.connect("ProgramData.db")

def has_table(table, fields):
    conn = _get_ProgramDB_Connection()
    conn.execute(f"CREATE TABLE IF NOT EXISTS {table} {fields}")
    conn.close()

def insert_value(table, fields, values):
    conn = _get_ProgramDB_Connection()
    placeholders = ",".join(["?"] * len(values))
    exec_str = f"INSERT INTO {table} ({','.join(fields)}) VALUES ({placeholders})"
    conn.execute(exec_str, values)
    conn.commit()
    conn.close()

def has_value(table, field, value):
    conn = _get_ProgramDB_Connection()
    cursor = conn.cursor()
    cursor.execute(f"SELECT Id FROM {table} WHERE {field}=?", [value])
    dta = cursor.fetchall()
    conn.close()
    return len(dta) > 0

def set_default(table, field, value, where):
    conn = _get_ProgramDB_Connection()
    if len(where) > 0:
        conn.execute(f"UPDATE {table} SET {field}={value} {where}")
    else:
        conn.execute(f"UPDATE {table} SET {field}={value}")
    conn.close()
    
def encrypt_password(password: str | bytes):
    if isinstance(password, str):
        return  bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return bcrypt.hashpw(password, bcrypt.gensalt())

def check_passwords(plain_pass: str, hashed_pass: bytes):
    if (bcrypt.checkpw(plain_pass.encode('utf-8'), hashed_pass)):
        return True
    return False