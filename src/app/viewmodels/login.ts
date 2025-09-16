import { NgClass } from '@angular/common';
import { EmailValidator, FormsModule } from '@angular/forms';
import { Component, NgModule, signal } from '@angular/core';
import { SHARED_IMPORTS } from '../shared/shared-imports';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { LoginController } from '../services/controllers/logincontroller';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: '../views/login.html',
  styleUrl: '../styles/login.scss'
})
export class LoginComponent {
  protected readonly title = signal('my-app');

  UserPassword: string = "";
  UserEmail: string = "";
  
  constructor(private router: Router, private _loginController: LoginController) {}

  login() {

    console.log(this.UserEmail, this.UserPassword)
    this._loginController.login(this.UserEmail, this.UserPassword)
      .subscribe({
            next: (res) => {
                console.log(res)
                if(res.status === 200) 
                    this.router.navigate(['/home'])
            },
            error: (err) => console.log('ERROR: ', err)
        });
  }
}
