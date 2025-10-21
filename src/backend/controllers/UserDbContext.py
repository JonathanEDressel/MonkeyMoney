from flask import Blueprint, jsonify
from Extensions import limiter
import json
import helper.Helper as DBHelper

def get_users():
    try:
        sql = "SELECT Username, FirstName, LastName, Email, PhoneNumber, CreatedDate, LastLogin FROM UserAcct;"
        usrs = DBHelper.run_query(sql, None, fetch=True)
        return jsonify({"message": usrs, "status": 200}), 200
    except Exception as e:
        return jsonify({"message": e, "statu": 400}), 400