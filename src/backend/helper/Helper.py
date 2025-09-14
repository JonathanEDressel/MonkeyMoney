import sqlite3

def has_table(conn, table, fields):
    conn.execute(f"CREATE TABLE IF NOT EXISTS {table} {fields}")

def insert_value(conn, table, fields, values):
    placeholders = ",".join(["?"] * len(values))
    exec_str = f"INSERT INTO {table} ({','.join(fields)}) VALUES ({placeholders})"
    conn.execute(exec_str, values)
    conn.commit()

def has_value(conn, table, field, value):
    cursor = conn.cursor()
    conn.execute(f"SELECT Id FROM Users WHERE Username=?", [value])
    dta = cursor.fetchall()
    print(dta)
    return len(dta) > 0

def set_default(conn, table, field, value, where):
    if len(where) > 0:
        conn.execute(f"UPDATE {table} SET {field}={value} {where}")
    else:
        conn.execute(f"UPDATE {table} SET {field}={value}")