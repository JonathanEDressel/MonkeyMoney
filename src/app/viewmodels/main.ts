import { EmailValidator, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { UserData } from '../services/userdata';
import { UserModel } from '../models/usermodel';
import { Observable } from 'rxjs';
import { RouterLink } from "@angular/router";
import { NgComponentOutlet } from '@angular/common';
import { OverviewComponent } from './portal/overview';
import { HistoryComponent } from './portal/history';
import { AccountsComponent } from './portal/accounts';
import { ProfileComponent } from './portal/profile';
import { AuthController } from '../services/controllers/authcontroller';

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
      { Id: 1, Title: 'Overview', class: "", Route: '/main', Visible: true, isSelected: Observable<false>, View: OverviewComponent },
      { Id: 2, Title: 'History', class: "", Route: '/main', Visible: true, isSelected: Observable<false>, View: HistoryComponent },
      { Id: 3, Title: 'Account', class: "", Route: '/main', Visible: true, isSelected: Observable<false>, View: AccountsComponent },
      { Id: 4, Title: 'Profile', class: "", Route: '/main', Visible: true, isSelected: Observable<false>, View: ProfileComponent },
      { Id: 5, Title: '', class: "fa-solid fa-gear", Route: '/main', Visible: true, isSelected: Observable<false>, View: ProfileComponent }
    ];

    constructor(private usrData: UserData, private _authController: AuthController) {}
    
    get getPage() {
      var page = this.portalPages.find(pg => this.selectedPage === pg.Id);
      return page?.View ?? null;
    }    

    setPage(page: any): void {
      this.selectedPage = page.Id;
    }

    ngOnInit(): void {
    }

    activate(): void {

    }

    logout(): void {
      this._authController.logout();
    }
}