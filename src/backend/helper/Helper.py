import sqlite3

def has_table(table, fields):
    conn = sqlite3.connect("ProgramData.db")
    conn.execute(f"CREATE TABLE IF NOT EXISTS {table} {fields}")
    conn.close()

def insert_value(table, fields, values):
    conn = sqlite3.connect("ProgramData.db")
    placeholders = ",".join(["?"] * len(values))
    exec_str = f"INSERT INTO {table} ({','.join(fields)}) VALUES ({placeholders})"
    conn.execute(exec_str, values)
    conn.commit()
    conn.close()

def has_value(table, field, value):
    conn = sqlite3.connect("ProgramData.db")
    cursor = conn.cursor()
    cursor.execute(f"SELECT Id FROM {table} WHERE {field}=?", [value])
    dta = cursor.fetchall()
    conn.close()
    print(dta)
    return len(dta) > 0

def set_default(table, field, value, where):
    conn = sqlite3.connect("ProgramData.db")
    if len(where) > 0:
        conn.execute(f"UPDATE {table} SET {field}={value} {where}")
    else:
        conn.execute(f"UPDATE {table} SET {field}={value}")
    conn.close()