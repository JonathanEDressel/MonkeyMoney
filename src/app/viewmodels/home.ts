import { NgClass } from '@angular/common';
import { EmailValidator, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../shared/shared-imports';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserController } from '../services/controllers/usercontroller';


@Component({
  selector: 'home-root',
  imports: [FormsModule],
  templateUrl: '../views/home.html',
  styleUrl: '../styles/home.scss'
})
export class HomeComponent {
    
}