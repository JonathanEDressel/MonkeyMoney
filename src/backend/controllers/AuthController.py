from flask import Blueprint, jsonify, request
from datetime import datetime
from Extensions import limiter
import helper.Helper as DBHelper

auth_bp = Blueprint("auth", __name__)

def has_admin():
    try:
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
    except Exception as e:
        print(f"ERROR: {e}")

@auth_bp.route('/login', methods=['POST'])
@limiter.limit("20 per minute")
def user_profile():
    try:
        req = request.json
        username = req.get('username', '').strip()
        password = req.get('userpassword', '').strip()
        if not username or not password:
            return jsonify({"message": "Please enter a username and password", "status": 400}), 400
        
        sql = f"SELECT UserPassword FROM UserAcct WHERE Username=%s or Email=%s"
        vars = (username, username)
        usr = DBHelper.run_query(sql, vars, True)
        if not usr:
            return jsonify({"message": "Invalid login credentials", "status": 400}), 400
            
        usrPWHash = usr[0]['UserPassword']
        if isinstance(usrPWHash, str):
            usrPWHash = usrPWHash.encode('utf-8')

        if(DBHelper.check_passwords(password, usrPWHash)):
            currDte = str(datetime.now())
            updatedLogin = DBHelper.update_value("UserAcct", "LastLogin", currDte, "Username", username)
            if not updatedLogin:
                DBHelper.update_value("UserAcct", "LastLogin", currDte, "Email", username)
            return jsonify({"message": "Login successful", "status": 200}), 200
        return jsonify({"message": "Invalid login credentials", "status": 409}), 409
    except Exception as e:
        print(f"ERROR: {e}")
        return jsonify({"message": e, "status": 400}), 400
    
@auth_bp.route('/signup',methods=['POST'])
@limiter.limit("5 per minute")
def create_account():
    try:
        req = request.json
        fname = req.get('firstname', '').strip()
        lname = req.get('lastname', '').strip()
        username = req.get('email', '').strip()
        phonenumber = req.get('phonenumber', '').strip()
        password = req.get('userpassword', '').strip()
        if not username or not password:
            return jsonify({"message": "Please enter a valid username and password", "status": 400}), 400
        
        sql = f"SELECT UserPassword FROM UserAcct WHERE Username=%s or Email=%s"
        vars = (username, username)
        usr = DBHelper.run_query(sql, vars, True)
        if usr:
            return jsonify({"message": "Failed to create user account", "status": 409}), 409

        hashedPassword = DBHelper.encrypt_password(password)
        sql = f"INSERT INTO UserAcct (Username, Email, FirstName, LastName, UserPassword, PhoneNumber, CreatedDate) " \
            "VALUES(%s, %s, %s, %s, %s, %s, %s);"
        vars = (username, username, fname, lname, hashedPassword, phonenumber, datetime.now())
        res = DBHelper.run_query(sql, vars, fetch=False)
        if not res:
            return jsonify({"message": "Failed to create user account", "status": 400}), 400
        return jsonify({"message": "User account created", "status": 200}), 200

    except Exception as e:
        print(f"ERROR: {e}")
        return jsonify({"message": e, "status": 400}), 400
    