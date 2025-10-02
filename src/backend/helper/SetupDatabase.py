import controllers.AuthController as AuthController
import helper.Helper as DBHelper

def validate_db():
    print("Setting up database...")
    useracct_created = DBHelper.create_table("UserAcct", "" \
                    "(Id INTEGER PRIMARY KEY AUTO_INCREMENT, " \
                    "Username VARCHAR(50) UNIQUE, " \
                    "FirstName VARCHAR(50), " \
                    "LastName VARCHAR(50), " \
                    "UserPassword VARCHAR(255), " \
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