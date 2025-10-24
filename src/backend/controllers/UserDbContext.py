from flask import jsonify
from Extensions import limiter
import helper.Helper as DBHelper
import controllers.AuthDbContext as _authDbCtx

def get_users():
    try:
        if not _authDbCtx.is_admin():        
            return jsonify({"result": "Unauthorized", "status": 401}), 401
        sql = "SELECT Username, FirstName, LastName, Email, PhoneNumber, CreatedDate, LastLogin FROM UserAcct;"
        usrs = DBHelper.run_query(sql, None, fetch=True)
        return jsonify({"result": usrs, "status": 200}), 200
    except Exception as e:
        return jsonify({"result": e, "status": 400}), 400
    
def add_taxable_account():
    print("placeholder")
    
def add_personal_account():
    print("placeholder")