import { EmailValidator, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { UserData } from '../services/userdata';
import { UserModel } from '../models/usermodel';
import { OverviewComponent } from './portal/overview';

@Component({
  selector: 'main-root',
  imports: [FormsModule],
  templateUrl: '../views/main.html',
  styleUrl: '../styles/main.scss'
})
export class MainComponent {
    users: UserModel[] = [];
    
    selectedPage: number = 1;
    portalPages = [
      { Id: 1, Title: 'Overview', Route: '/main', Visible: true, View: OverviewComponent },
      { Id: 2, Title: 'History', Route: '/main', Visible: true, View: '' },
      { Id: 3, Title: 'Account', Route: '/main', Visible: true, View: '' },
      { Id: 4, Title: 'Profile', Route: '/main', Visible: true, View: '' }
    ];

    constructor(private usrData: UserData) {}
    
    ngOnInit(): void {
      this.activate();
    }

    activate() {
      this.usrData.getUsers().subscribe({
        next: (dta) => {
          this.users = dta;
          console.log('users - ', this.users);
        },
        error: (err) => {
          console.log('ERROR: ', err); 
        }
      })
    }
}