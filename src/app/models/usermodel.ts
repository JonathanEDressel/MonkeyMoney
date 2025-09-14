export class UserModel {
    Username = <string>("");
    FirstName = <string>("");
    LastName = <string>("");
    Email = <string>("");
    PhoneNumber = <string>("");
    LastLogin = <string>("");
    IsDemo = <string>("");
    AdminLevel = <string>("");
    IsAdmin = <string>("");

    constructor() {
        this.Username = "";
        this.FirstName = "";
        this.LastName = "";
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
        this.Username = data.Username;
        this.FirstName = data.FirstName;
        this.LastName = data.LastName;
        this.Email = data.Email;
        this.PhoneNumber = data.PhoneNumber;
        this.LastLogin = data.LastLogin;
        this.IsDemo = data.IsDemo
        this.AdminLevel = data.AdminLevel
        this.IsAdmin = data.IsAdmin
    }

    getData() {
        return {
            Username: this.Username,
            FirstName: this.FirstName,
            LastName: this.LastName,
            Email: this.Email,
            PhoneNumber: this.PhoneNumber,
            LastLogin: this.LastLogin,
            IsDemo: this.IsDemo,
            AdminLevel: this.AdminLevel,
            IsAdmin: this.IsAdmin
        };
    }
}
