import { EmailValidator, FormsModule } from '@angular/forms';
import { Component, signal } from '@angular/core';
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
    ErrorMsg = signal("");

    //have this later lead to Stripe where the user can pay to sign up
    constructor(private router: Router, private _authController: AuthController) {}

    returnToLogin(): void {
      this.router.navigate(['/login']);
    }
    
    createAccount(): void {
      this._authController.createAccount(this.user.FirstName, this.user.LastName, this.user.Email, this.password, this.user.PhoneNumber).subscribe({
        next: (res) => {
          localStorage.setItem('jwt', res.token);
          this.router.navigate(['/main'])
          this.ErrorMsg.set("");
          console.log("Account created");
        },
        error: (err) => {
          this.ErrorMsg.set("Invalid credentials");
          console.log("ERROR: " + err)
        }
      });
    }
}