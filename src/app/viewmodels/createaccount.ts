import { EmailValidator, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { UserModel } from '../models/usermodel';
import { Router } from '@angular/router';
import { AuthController } from '../services/controllers/authcontroller';


@Component({
  selector: 'createaccount-root',
  imports: [FormsModule],
  templateUrl: '../views/createaccount.html',
  styleUrl: '../styles/createaccount.scss'
})
export class CreateAccountComponent {
    user: UserModel = new UserModel();
    password: string = "";

    //have this later lead to Stripe where the user can pay to sign up
    constructor(private router: Router, private _authController: AuthController) {}

    returnToLogin() {
      this.router.navigate(['/login']);
    }
    
    createAccount() {
      console.log("USER - " + this.user)
      this._authController.addUser(this.user.FirstName, this.user.LastName, this.user.Email, this.password, this.user.PhoneNumber)
        .subscribe({
            next: (res) => {
                if(res.status === 200) {
                    this.router.navigate(['/home'])
                }
            },
            error: (err) => {
              console.log("ERROR: " + err)
            }
        });
    }
}