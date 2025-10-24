import { Injectable, signal } from "@angular/core";
import { UserModel } from "../models/usermodel";
import { UserController } from "./controllers/usercontroller";

@Injectable({
    providedIn: 'root'
})
export class UserData {

    constructor(private _userController: UserController) {}

    users: UserModel[] = [];
    user = signal(new UserModel()); //= new UserModel();

    getUsers(): void {
      this._userController.getUsers().subscribe({
        next: (res: any) => {
          this.users.length = 0;
          if(res.status === 200) {
            var data = res.result;
            for(var i = 0; i < data.length; i++) {
              var usr = new UserModel();
              usr.assignData(data[i]);
              this.users.push(usr);
            }
            console.log('Users:', this.users)
          }
        },
        error: (err) => console.error(err)
      });
    }
    getUser(): void {
      this._userController.getUser().subscribe({
        next: (res: any) => {
          this.user.set(new UserModel());
          if(res.status === 200) {
            var data = res.result;
            var tmp = new UserModel();
            tmp.assignData(data);
            this.user.set(tmp);
          }
          console.log('User - ', this.user())
        },
        error: (err: any) => console.error(err)
      })
    }
}