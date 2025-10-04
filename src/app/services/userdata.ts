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

    getUsers(): Observable<UserModel[]> {
    return this._userController.getUsers().pipe(
      map((res: any) => {
        if (res?.status === 200) {
          return res.message.map((tmp: any) => {
            const usr = new UserModel();
            usr.assignData(tmp);
            return usr;
          });
        }
        return [];
      })
    );
  }
}