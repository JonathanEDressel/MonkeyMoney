import { NgClass } from '@angular/common';
import { EmailValidator, FormsModule } from '@angular/forms';
import { Component, NgModule, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthController } from '../services/controllers/authcontroller';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: '../views/login.html',
  styleUrl: '../styles/login.scss'
})
export class LoginComponent {
  protected readonly title = signal('my-app');

  UserPassword: string = "";
  UserEmail: string = "";
  ErrorMsg = signal("");
  
  constructor(private router: Router, private _authController: AuthController) {}

  createAccount() {
    this.router.navigate(['/createaccount']);
  }

  login() {
    this._authController.login(this.UserEmail, this.UserPassword)
      .subscribe({
            next: (res) => {
                if(res.status === 200) {
                    this.router.navigate(['/main'])
                    this.ErrorMsg.set("");
                }
            },
            error: (err) => {
              this.ErrorMsg.set("Invalid credentials");
              console.log("ERROR: " + err, this.ErrorMsg)
            }
        });
  }
}
