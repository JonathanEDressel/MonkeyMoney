import { EmailValidator, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { UserModel } from '../models/usermodel';
import { Router } from '@angular/router';
import { UserController } from '../services/controllers/usercontroller';


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

    constructor(private router: Router, private _userController: UserController) {}

    returnToLogin() {
      this.router.navigate(['/login']);
    }
    
    createAccount() {
      console.log("CREATE")
      this._userController.addUser(this.user.FirstName, this.user.LastName, this.user.Email, this.password)
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