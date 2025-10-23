import { Injectable, signal } from "@angular/core";
import { UserModel } from "../models/usermodel";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { AuthController } from "./controllers/authcontroller";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthData {

    constructor(private router: Router,private _authController: AuthController) {}

    users: UserModel[] = [];
    ErrorMsg = signal("");

    login(username: string, password: string): any {
        this._authController.login(username, password).subscribe({
            next: (res: any) => {
                console.log('User logged in');
                localStorage.setItem('jwt', res.token);
                this.router.navigate(['/main']);
            },
            error: (err: any) => {
                this.ErrorMsg.set("Invalid credentials");
                console.log("ERROR: " + err, this.ErrorMsg)
            }
      });
    }

    createAccount(firstname: string, lastname: string, email: string, password: string,phonenumber: string): void {
      this._authController.createAccount(firstname, lastname, email, password, phonenumber).subscribe({
        next: (res: any) => {
            if(res?.token) {
                localStorage.setItem('jwt', res.token);
                this.router.navigate(['/main'])
                this.ErrorMsg.set("");
                console.log("Account created");
            }
        },
        error: (err) => {
          this.ErrorMsg.set("Invalid credentials");
          console.log("ERROR: " + err)
        }
      });
    }

    isAdmin() {
        this._authController.isAdmin().subscribe({
            next: (res) => {
                console.log('res - ', res)
            },
            error: (err) => {
                console.error('ERROR: ')
            }
        });
    }
}