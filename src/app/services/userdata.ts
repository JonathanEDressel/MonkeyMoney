import { UserModel } from "../models/usermodel";
import { UserController } from "./controllers/usercontroller";

export class UserData {
    users: UserModel[] = [];

    constructor(private _userController: UserController) {}

    getUsers() {
        this._userController.getUsers().subscribe({
            next: (res) => {
                console.log('result - ', res)
            },
            error: (err) => {
            }
        });
    }
}