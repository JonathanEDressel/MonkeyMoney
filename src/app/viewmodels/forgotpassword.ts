import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [FormsModule],
  templateUrl: '../views/forgotpassword.html',
  styleUrl: '../styles/forgotpassword.scss'
})

export class ForgotPassword implements OnInit {

  // codeForm: FormGroup | undefined;
  userEmail: string = "";

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    // this.codeForm = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    // });
  }

  returnToLogin(): void {
    this.router.navigate(['/login']);
  }

  sendVerificationCode(): void {
    console.log(this.userEmail);
  }
}