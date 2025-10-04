export class UserModel {
    Username = <string>("");
    FirstName = <string>("");
    LastName = <string>("");
    Email = <string>("");
    PhoneNumber = <string>("");
    LastLogin = <string>("");
    CreatedDate = <string>("");
    IsDemo = <boolean>(false);
    IsAdmin = <boolean>(false);
    AdminLevel = <string>("");
    ConfirmedEmail = <boolean>(false);
    TwoFactor = <boolean>(false);

    constructor() {
        this.Username = "";
        this.FirstName = "";
        this.LastName = "";
        this.Email = "";
        this.PhoneNumber = "";
        this.LastLogin = "";
        this.CreatedDate = "";
        this.IsDemo = false;
        this.IsAdmin = false;
        this.AdminLevel = "";
        this.ConfirmedEmail = false;
        this.TwoFactor = false;
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
        this.LastLogin = (new Date(data.LastLogin)).toLocaleDateString();
        this.CreatedDate = (new Date(data.CreatedDate)).toLocaleDateString();
        this.IsDemo = data.IsDemo;
        this.IsAdmin = data.IsAdmin;
        this.AdminLevel = data.AdminLevel;
        this.ConfirmedEmail = data.ConfirmedEmail;
        this.TwoFactor = data.TwoFactor;
    }

    getData() {
        return {
            Username: this.Username,
            FirstName: this.FirstName,
            LastName: this.LastName,
            Email: this.Email,
            PhoneNumber: this.PhoneNumber,
            LastLogin: this.LastLogin,
            CreatedDate: this.CreatedDate,
            IsDemo: this.IsDemo,
            IsAdmin: this.IsAdmin,
            AdminLevel: this.AdminLevel,
            ConfirmedEmail: this.ConfirmedEmail,
            TwoFactor: this.TwoFactor,
        };
    }
}
