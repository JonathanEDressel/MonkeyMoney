import { Injectable } from "@angular/core";
import { UserModel } from "../models/usermodel";
import { UserController } from "./controllers/usercontroller";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserData {

    constructor(private _userController: UserController) {}

    users: UserModel[] = [];

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
}