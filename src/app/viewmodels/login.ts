import { NgClass } from '@angular/common';
import { EmailValidator, FormsModule } from '@angular/forms';
import { Component, NgModule, signal } from '@angular/core';
import { SHARED_IMPORTS } from '../shared/shared-imports';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { LoginController } from '../services/controllers/logincontroller';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: '../views/login.html',
  styleUrl: '../styles/login.scss'
})
export class App {
  protected readonly title = signal('my-app');

  UserPassword: string = "";
  UserEmail: string = "";
  
  constructor(private _loginController: LoginController) {}

  login() {
    this._loginController.login(this.UserEmail, this.UserPassword);
  }
}
