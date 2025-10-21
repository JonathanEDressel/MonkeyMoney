from dotenv import load_dotenv
# import InitiateConnection
import mysql.connector
import bcrypt
import uuid
import os

load_dotenv()

HOST_URL=os.getenv("HOST_URL")
MYSQL_USER=os.getenv("MYSQL_USER")
MYSQL_PASSWORD=os.getenv("MYSQL_PASSWORD")
MYSQL_PROGRAM_DB=os.getenv("MYSQL_PROGRAM_DB")

def connect_to_db():
    return mysql.connector.connect(
        host=HOST_URL,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_PROGRAM_DB
    )

def run_query(query, params=None, fetch=False):
    try:
        connection = connect_to_db()
        cursor = connection.cursor(dictionary=True)
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        if fetch:
            return cursor.fetchall()
        connection.commit()
        return True
    except Exception as e:
        print(f"ERROR: {e}")
        return False
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def update_value(table, field, value, where_field, where_value):
    try:
        sql = f"UPDATE {table} SET {field}=%s WHERE {where_field}=%s"
        params = (value, where_value)
        result = run_query(sql, params, fetch=False)
        return result
    except Exception as e:
        print(f"ERROR update_value(): {e}")
        return False

def create_table(table, fields):
    try:
        print(f"Checking if {table} table exists.")
        connection = connect_to_db()
        cursor = connection.cursor()
        cursor.execute("SHOW TABLES")
        exists = False
        for t in cursor:
            if t[0].lower().strip() == table.lower().strip():
                exists = True
                break
        
        if not exists:
            print(f"{table} table does not exist. Creating table...")
            sql = f"CREATE TABLE IF NOT EXISTS {table} {fields};"
            run_query(sql)
        else:
            print(f"{table} table already exists")
        return True
    except Exception as e:
        print(f"ERROR create_table(): {e}")
        return False

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
        
def create_uuid():
    new_uuid = str(uuid.uuid4())
    return new_uuid