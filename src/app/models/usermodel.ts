export class UserModel {
    FirstName = <string>("");
    LastName = <string>("");
    Username = <string>("");
    Email = <string>("");
    PhoneNumber = <string>("");
    LastLogin = <string>("");
    IsDemo = <string>("");
    AdminLevel = <string>("");
    IsAdmin = <string>("");

    constructor() {
        this.FirstName = "";
        this.LastName = "";
        this.Username = "";
        this.Email = "";
        this.PhoneNumber = "";
        this.LastLogin = "";
        this.IsDemo = "";
        this.AdminLevel = "";
        this.IsAdmin = "";
    }

    getFullName() {
        return this.FirstName + " " + this.LastName;
    }

    assignData(data: UserModel) {
        this.FirstName = data.FirstName;
        this.LastName = data.LastName;
        this.Username = data.Username;
        this.Email = data.Email;
        this.PhoneNumber = data.PhoneNumber;
        this.LastLogin = data.LastLogin;
        this.IsDemo = data.IsDemo
        this.AdminLevel = data.AdminLevel
        this.IsAdmin = data.IsAdmin
    }

    getData() {
        return {
            FirstName: this.FirstName,
            LastName: this.LastName,
            Username: this.Username,
            Email: this.Email,
            PhoneNumber: this.PhoneNumber,
            LastLogin: this.LastLogin,
            IsDemo: this.IsDemo,
            AdminLevel: this.AdminLevel,
            IsAdmin: this.IsAdmin
        };
    }
}
