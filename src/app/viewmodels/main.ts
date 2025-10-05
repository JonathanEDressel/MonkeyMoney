import { EmailValidator, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { UserData } from '../services/userdata';
import { UserModel } from '../models/usermodel';
import { Observable } from 'rxjs';
import { RouterLink } from "@angular/router";
import { NgComponentOutlet } from '@angular/common';
import { OverviewComponent } from './portal/overview';
import { HistoryComponent } from './portal/userlogs';
import { AccountsComponent } from './portal/accounts';
import { ProfileComponent } from './portal/profile';

@Component({
  selector: 'main-root',
  imports: [FormsModule, RouterLink, NgComponentOutlet],
  templateUrl: '../views/main.html',
  styleUrl: '../styles/main.scss'
})
export class MainComponent {
    users: UserModel[] = [];
    
    selectedPage: number = 1;
    portalPages = [
      { Id: 1, Title: 'Overview', Route: '/main', Visible: true, isSelected: Observable<false>, View: OverviewComponent },
      { Id: 2, Title: 'History', Route: '/main', Visible: true, isSelected: Observable<false>, View: HistoryComponent },
      { Id: 3, Title: 'Account', Route: '/main', Visible: true, isSelected: Observable<false>, View: AccountsComponent },
      { Id: 4, Title: 'Profile', Route: '/main', Visible: true, isSelected: Observable<false>, View: ProfileComponent }
    ];

    constructor(private usrData: UserData) {}
    
    get getPage() {
      var page = this.portalPages.find(pg => this.selectedPage === pg.Id);
      return page?.View ?? null;
    }    

    setPage(page: any) {
      this.selectedPage = page.Id;
      console.log(page.Title);
    }

    ngOnInit(): void {
    }

    activate() {

    }
}