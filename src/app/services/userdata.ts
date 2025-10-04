import { Injectable } from "@angular/core";
import { UserModel } from "../models/usermodel";
import { UserController } from "./controllers/usercontroller";

@Injectable({
    providedIn: 'root'
})
export class UserData {
    users: UserModel[] = [];

    constructor(private _userController: UserController) {}

    getUsers() {
        this._userController.getUsers().subscribe({
            next: (res: any) => {
                if(res?.status === 200) {
                    var usr;
                    for(var i = 0; i < res.message.length; i++) {
                        usr = new UserModel()
                        var tmp = res.message[i]
                        usr.assignData(tmp);
                        this.users.push(usr);
                    }
                    console.log('result - ', this.users)
                    return this.users;
                }
                return null;
            },
            error: (err) => {
                console.log('ERROR: ' + err)
            }
        });
    }
}