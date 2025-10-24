import { EmailValidator, FormsModule } from '@angular/forms';
import { Component, signal } from '@angular/core';
import { UserData } from '../services/userdata';
import { UserModel } from '../models/usermodel';
import { Observable, of } from 'rxjs';
import { RouterLink } from "@angular/router";
import { NgComponentOutlet } from '@angular/common';
import { OverviewComponent } from './portal/overview';
import { HistoryComponent } from './portal/history';
import { AccountsComponent } from './portal/accounts';
import { ProfileComponent } from './portal/profile';
import { AdminComponent } from './admin/admin';
import { AuthData } from '../services/authdata';

@Component({
  selector: 'main-root',
  imports: [FormsModule, RouterLink, NgComponentOutlet],
  templateUrl: '../views/main.html',
  styleUrl: '../styles/main.scss'
})
export class MainComponent {
    constructor(private _usrData: UserData, private _authData: AuthData) {
    }

    users: UserModel[] = [];
    numbers$ = 1;
    selectedPage: number = 2;

    get user() {
      // return this._usrData.user();
      // console.log(this._usrData.user())
      return "null";
    }

    portalPages = [
      { Id: 1, Title: 'Admin', class: "", Route: '/main', Visible: this.user, isSelected: Observable<false>, View: AdminComponent },
      { Id: 2, Title: 'Overview', class: "", Route: '/main', Visible: true, isSelected: Observable<false>, View: OverviewComponent },
      { Id: 3, Title: 'History', class: "", Route: '/main', Visible: true, isSelected: Observable<false>, View: HistoryComponent },
      { Id: 4, Title: 'Account', class: "", Route: '/main', Visible: true, isSelected: Observable<false>, View: AccountsComponent },
      { Id: 5, Title: 'Profile', class: "", Route: '/main', Visible: true, isSelected: Observable<false>, View: ProfileComponent },
      { Id: 6, Title: '', class: "fa-solid fa-gear", Route: '/main', Visible: true, isSelected: Observable<false>, View: ProfileComponent }
    ];

    get getPage() {
      var page = this.portalPages.find(pg => this.selectedPage === pg.Id);
      return page?.View ?? null;
    }    

    setPage(page: any): void {
      this.selectedPage = page.Id;
    }

    ngOnInit(): void {
      this._usrData.getUser();
      console.log('numbers$ - ', this.numbers$)
    }

    activate(): void {

    }

    logout(): void {
      this._authData.logout();
    }
}