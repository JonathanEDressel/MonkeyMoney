# import sqlite3
from dotenv import load_dotenv
import mysql.connector
import bcrypt
import os

load_dotenv()

HOST_URL=os.getenv("HOST_URL")
MYSQL_USER=os.getenv("MYSQL_USER")
MYSQL_PASSWORD=os.getenv("MYSQL_PASSWORD")
MYSQL_PROGRAM_DB=os.getenv("MYSQL_PROGRAM_DB")

def run_query(query, params=None, fetch=False):
    try:
        connection = mysql.connector.connect(
            host=HOST_URL,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            database=MYSQL_PROGRAM_DB
        )
        cursor = connection.cursor(dictionary=True)
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        print(fetch)
        # if fetch:
        return cursor.fetchall()
        # connection.commit()
        # return True;
    except Exception as e:
        print(f"ERROR: {e}")
        return None
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# def _get_ProgramDB_Connection():
#     return sqlite3.connect("ProgramData.db")

# def _get_ProgramDB_Connection2():
#     return sqlite3.connect("ProgramData.db")

# def has_table(table, fields):
#     try:
#         conn = _get_ProgramDB_Connection()
#         conn.execute(f"CREATE TABLE IF NOT EXISTS {table} {fields}")
#         conn.close()
#     except Exception as e:
#         print(f"ERROR has_table(): {e}")

def update_value(table, field, value, where_field, where_value):
    try:
        print("update_value")
        # conn = _get_ProgramDB_Connection()
        # cursor = conn.cursor()
        sql = f"UPDATE {table} SET {field}=? WHERE {where_field}=?"
        run_query(sql)
        # cursor.execute(sql, (value, where_value))
        # usr_updated = cursor.fetchone()
        # conn.commit()
        # conn.close()
        return 1
    except Exception as e:
        print(f"ERROR update_value(): {e}")

# def insert_value(table, fields, values):
#     try:
#         conn = _get_ProgramDB_Connection()
#         placeholders = ",".join(["?"] * len(values))
#         exec_str = f"INSERT INTO {table} ({','.join(fields)}) VALUES ({placeholders})"
#         conn.execute(exec_str, values)
#         conn.commit()
#         conn.close()
#     except Exception as e:
#         print(f"ERROR insert_value(): {e}")

# def has_email(email):
#     try:
#         conn = _get_ProgramDB_Connection()
#         cursor = conn.cursor()
#         cursor.execute(f"SELECT Email FROM UserAcct WHERE Email=?", [email])
#         usrrow = cursor.fetchone()
#         conn.close()
#         return usrrow
#     except Exception as e:
#         print(f"ERROR has_email(): {e}")

# def has_username(username):
#     try:
#         conn = _get_ProgramDB_Connection()
#         cursor = conn.cursor()
#         cursor.execute(f"SELECT Username FROM UserAcct WHERE Username=?", [username])
#         usrrow = cursor.fetchone()
#         conn.close()
#         return usrrow
#     except Exception as e:
#         print(f"ERROR has_username(): {e}")

# def has_value(table, field, value):
#     try:
#         conn = _get_ProgramDB_Connection()
#         cursor = conn.cursor()
#         cursor.execute(f"SELECT Id FROM {table} WHERE {field}=?", [value])
#         dta = cursor.fetchall()
#         conn.close()
#         return len(dta) > 0
#     except Exception as e:
#         print(f"ERROR has_value(): {e}")

def has_value2(table, field, value):
    try:
        print('hi')
    except Exception as e:
        print(f"ERROR has_value(): {e}")

# def set_default(table, field, value, where):
#     try:
#         conn = _get_ProgramDB_Connection()
#         if len(where) > 0:
#             conn.execute(f"UPDATE {table} SET {field}={value} {where}")
#         else:
#             conn.execute(f"UPDATE {table} SET {field}={value}")
#         conn.close()
#     except Exception as e:
#         print(f"ERROR set_default(): {e}")
    
def encrypt_password(password: str | bytes):
    try:
        if isinstance(password, str):
            return  bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        return bcrypt.hashpw(password, bcrypt.gensalt())
    except Exception as e:
        print(f"ERROR encrypt_password(): {e}")

def check_passwords(plain_pass: str, hashed_pass: bytes):
    try:
        if (bcrypt.checkpw(plain_pass.encode('utf-8'), hashed_pass)):
            return True
        return False
    except Exception as e:
        print(f"ERROR check_passwords(): {e}")