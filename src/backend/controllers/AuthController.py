from flask import Blueprint, jsonify, request
from datetime import datetime
from Extensions import limiter
import helper.Helper as DBHelper

auth_bp = Blueprint("auth", __name__)

def has_admin():
    h = DBHelper.encrypt_password("password")
    currDte = str(datetime.now())
    res = DBHelper.run_query("SELECT Username FROM UserAcct Where Username = %s or Email = %s", 
                            ("Admin", "jonathanedressel@gmail.com"), 
                            True)
    if not res:
        sql = """
        INSERT INTO UserAcct
        (Username, UserPassword, FirstName, LastName, Email, CreatedDate,
        ConfirmedEmail, TwoFactor, AdminLevel, IsAdmin, IsDemo)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        params = ("Admin", h, "Jonathan", "Dressel", "jonathanedressel@gmail.com", currDte,
                  1, 0, "Site", 1, 0)
        DBHelper.run_query(sql, params)

@auth_bp.route('/login', methods=['POST'])
@limiter.limit("20 per minute")
def user_profile():
    req = request.json
    username = req.get('username', '').strip()
    password = req.get('userpassword', '').strip()
    if not username or not password:
        return jsonify({"message": "Please enter a username and password", "status": 404}), 404
    
    sql = f"SELECT UserPassword FROM UserAcct WHERE Username=\"%s\" or Email=\"%s\""
    vars = (username, username)
    print(sql)
    usr = DBHelper.run_query(sql, vars, True)
    if not usr:
        return jsonify({"message": "Invalid login credentials", "status": 404}), 404
        
    usrPWHash = usr[0]['UserPassword']
    print(usrPWHash)
    if isinstance(usrPWHash, str):
        usrPWHash = usrPWHash.encode('utf-8')

    if(DBHelper.check_passwords(password, usrPWHash)):
        currDte = str(datetime.now())
        updatedLogin = DBHelper.update_value("UserAcct", "LastLogin", currDte, "Username", username)
        if not updatedLogin:
            DBHelper.update_value("UserAcct", "LastLogin", currDte, "Email", username)
        return jsonify({"message": "Login successful", "status": 200}), 200
    return jsonify({"message": "Invalid login credentials", "status": 404}), 404