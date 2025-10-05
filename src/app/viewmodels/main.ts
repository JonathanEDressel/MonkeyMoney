import { EmailValidator, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { UserData } from '../services/userdata';
import { UserModel } from '../models/usermodel';
import { OverviewComponent } from './portal/overview';
import { from, of, Observable, Subscriber } from 'rxjs';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'main-root',
  imports: [FormsModule, RouterLink],
  templateUrl: '../views/main.html',
  styleUrl: '../styles/main.scss'
})
export class MainComponent {
    users: UserModel[] = [];
    
    selectedPage: number = 1;
    portalPages = [
      { Id: 1, Title: 'Overview', Route: '/main', Visible: true, isSelected: Observable<false>, View: OverviewComponent },
      { Id: 2, Title: 'History', Route: '/main', Visible: true, isSelected: Observable<false>, View: '' },
      { Id: 3, Title: 'Account', Route: '/main', Visible: true, isSelected: Observable<false>, View: '' },
      { Id: 4, Title: 'Profile', Route: '/main', Visible: true, isSelected: Observable<false>, View: '' }
    ];

    constructor(private usrData: UserData) {}
    
    currentPage: Observable<any> = from(this.portalPages);

    setPage(page: any) {
      this.selectedPage = page.Id;
      console.log(page.Title);
    }

    ngOnInit(): void {
      this.activate();

      this.currentPage.subscribe(x => {
        console.log(x.Title)
      });
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