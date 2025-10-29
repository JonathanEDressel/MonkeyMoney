from flask import jsonify
from datetime import datetime, timezone
import helper.Helper as DBHelper
from models.PersonalAccountModel import data_to_model

#InvestmentAccounts
def add_taxable_account():
    return jsonify({"result": "success", "status": 200}), 200
    
#PersonalAccounts
def add_personal_account(userid, name, type):
    try:
        params = ["UserId", "Name", "Type", "CreatedDate"]
        values = (userid, name, type, datetime.now(timezone.utc))
        acctid = DBHelper.insert_into("PersonalAccounts", params, values)
        if acctid <= 0:
            print(f"Account ({name}) added successfully")
        return acctid
    except Exception as e:
        print(f"ERROR: {e}")
        return -1
    
def get_personal_accounts(userid):
    try:
        sql = "SELECT PA.Id AS AccountId, PA.UserId, PA.Name, PA.Type, PA.CreatedDate FROM " \
            "PersonalAccounts as PA " \
            "INNER JOIN PersonalAccountHistory AS PAH ON PA.Id = PAH.AccountId " \
            "WHERE PA.UserId = %s ORDER By PA.Id Desc"
        params = (userid,)
        accounts = DBHelper.run_query(sql, params, True)
        res = []
        for a in accounts:
            tmp = data_to_model(a)
            res.append(tmp)
        return res
    except Exception as e:
        print(f"ERROR: {e}")
        return -1
    
#PersonalAccountHistory
def add_personal_record(accountid, balance):
    try:
        params = ["AccountId", "RecordedDate", "Balance"]
        values = (accountid, datetime.now(timezone.utc), balance)
        id = DBHelper.insert_into("PersonalAccountHistory", params, values)
        if id > 0:
            print(f"Account ({accountid}) record added successfully")
        return id
    except Exception as e:
        print(f"ERROR: {e}")
        return False