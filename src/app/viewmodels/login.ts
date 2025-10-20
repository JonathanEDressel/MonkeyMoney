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

  createAccount(): void {
    this.router.navigate(['/createaccount']);
  }

  forgotPassword(): void {
    this.router.navigate(['/forgotpassword'])
  }
  
  login(): void {
    this._authController.login(this.UserEmail, this.UserPassword).subscribe({
        next: (res) => {
          console.log('User logged in');
          localStorage.setItem('jwt', res.token);
          this.router.navigate(['/main']);
        },
        error: (err) => {
          this.ErrorMsg.set("Invalid credentials");
          console.log("ERROR: " + err, this.ErrorMsg)
        }
      });
  }
}
