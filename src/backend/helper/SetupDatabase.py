import controllers.AuthController as AuthController
import helper.Helper as DBHelper

def validate_db():
    print("Setting up databases...")
    useracct_created = DBHelper.create_table("UserAcct", "" \
                    "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
                    "Username VARCHAR(50) UNIQUE, " \
                    "FirstName VARCHAR(50), " \
                    "LastName VARCHAR(50), " \
                    "UserPassword VARCHAR(255), " \
                    "UUID VARCHAR(100), " \
                    "Email VARCHAR(100) UNIQUE, " \
                    "PhoneNumber VARCHAR(20) UNIQUE, " \
                    "CreatedDate DATETIME, " \
                    "ConfirmedEmail TINYINT DEFAULT 0, " \
                    "TwoFactor TINYINT DEFAULT 1, " \
                    "LastLogin DATETIME, " \
                    "IsDemo TINYINT DEFAULT 0, " \
                    "AdminLevel VARCHAR(20), " \
                    "IsAdmin TINYINT DEFAULT 0)")
    if useracct_created:
        print("Creating admin user")
        AuthController.has_admin()
        
    DBHelper.create_table("ErrorLog", "" \
        "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
        "EventTimeStamp DATETIME, " \
        "EventText VARCHAR(100), " \
        "Detail LONGBLOB, " \
        "Parameters LONGBLOB, " \
        "Username VARCHAR(100))")
    
    DBHelper.create_table("EventLog", "" \
        "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
        "EventTimeStamp DATETIME, " \
        "EventText VARCHAR(100), " \
        "Source VARCHAR(100), " \
        "EventType VARCHAR(100), " \
        "EventUser VARCHAR(100))")
    
    DBHelper.create_table("EmailLog", "" \
        "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
        "SentTime DATETIME, " \
        "SentFrom VARCHAR(100), " \
        "Subject VARCHAR(100), " \
        "Body LONGBLOB, " \
        "Reason VARCHAR(100), " \
        "Duration INTEGER)")
    
    DBHelper.create_table("BlockedIPs", "" \
        "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
        "UserId INTEGER NOT NULL, " \
        "IPAddress VARCHAR(100), " \
        "Notes VARCHAR(255), " \
        "DateAdded DATETIME, " \
        "FOREIGN KEY (UserId) References UserAcct(Id))")
    
    DBHelper.create_table("ReportLog", "" \
        "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
        "UserId INTEGER NOT NULL, " \
        "CreatedTime DATETIME, " \
        "Duration INTEGER, " \
        "Details VARCHAR(255), " \
        "FOREIGN KEY (UserId) References UserAcct(Id))")
    
    DBHelper.create_table("ReferralLog", "" \
        "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
        "UserId INTEGER NOT NULL, " \
        "ReferralCode VARCHAR(100), " \
        "UsersReferred LONGBLOB, " \
        "MonthsDiscounted INTEGER, " \
        "UsedReferralCode TINYINT DEFAULT 0, "\
        "FOREIGN KEY (UserId) References UserAcct(Id))")
    
    DBHelper.create_table("PersonalAccounts", "" \
        "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
        "UserId INTEGER NOT NULL, " \
        "Name VARCHAR(100), " \
        "Type VARCHAR(100), " \
        "CreatedDate DATETIME, " \
        "FOREIGN KEY (UserId) References UserAcct(Id))")
    
    DBHelper.create_table("InvestmentAccounts", "" \
        "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
        "UserId INTEGER NOT NULL, " \
        "Name VARCHAR(100), " \
        "Type VARCHAR(100), " \
        "CreatedDate DATETIME, " \
        "Holdings LONGBLOB, " \
        "FOREIGN KEY (UserId) References UserAcct(Id))")
    
    DBHelper.create_table("AccountHoldings", "" \
        "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
        "InvestmentId INTEGER NOT NULL, " \
        "TickerSymbol VARCHAR(100), " \
        "Shares FLOAT, " \
        "FOREIGN KEY (InvestmentId) References InvestmentAccounts(Id))")
    
    DBHelper.create_table("InvestmentAccountHistory", "" \
        "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
        "AccountId INTEGER NOT NULL, " \
        "RecordedDate DATETIME, " \
        "Balance FLOAT, " \
        "FOREIGN KEY (AccountId) References InvestmentAccounts(Id))")
    
    DBHelper.create_table("PersonalAccountHistory", "" \
        "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
        "AccountId INTEGER NOT NULL, " \
        "RecordedDate DATETIME, " \
        "Balance FLOAT, " \
        "FOREIGN KEY (AccountId) References PersonalAccounts(Id))")