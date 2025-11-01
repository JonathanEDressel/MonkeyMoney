from flask import jsonify
from datetime import datetime, timezone
import helper.Helper as DBHelper
import models.PersonalAccountModel as PersonalAccount

#InvestmentAccounts
def add_taxable_account():
    return jsonify({"result": "success", "status": 200}), 200
    
#PersonalAccounts
def add_personal_account(userid, name, type, balance):
    try:
        params = ["UserId", "Name", "Type", "Balance", "CreatedDate"]
        dte = datetime.now(timezone.utc)
        values = (userid, name, type, balance, dte)
        acctid = DBHelper.insert_into("PersonalAccounts", params, values)
        if acctid <= 0:
            print(f"Account ({name}) added successfully")
            
        #create an assign from data to model function
        res = PersonalAccount.PersonalAccount()
        res.Id = acctid
        res.DateAdded = dte
        res.Name = name
        res.Type = type
        res.Balance = 2300
        return res
    except Exception as e:
        print(f"ERROR: {e}")
        return -1
    
def get_personal_accounts(userid):
    try:
        sql = "SELECT pa.Id AS AccountId, pa.UserId, pa.Balance, pa.Name, pa.Type, pa.CreatedDate From PersonalAccounts as pa " \
            "WHERE pa.UserId = %s Order by pa.Id Desc"
        # sql = "SELECT PA.Id AS AccountId, PA.Balance, PA.UserId, PA.Name, PA.Type, PA.CreatedDate FROM " \
            # "PersonalAccounts as PA " \
            # "INNER JOIN PersonalAccountHistory AS PAH ON PA.Id = PAH.AccountId " \
            # "WHERE PA.UserId = %s ORDER By PA.Id Desc"
        params = (userid,)
        accounts = DBHelper.run_query(sql, params, True)
        res = []
        for a in accounts:
            tmp = PersonalAccount.data_to_model(a)
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