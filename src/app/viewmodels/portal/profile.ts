import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserData } from '../../services/userdata';

@Component({
  selector: 'overview-root',
  imports: [FormsModule],
  templateUrl: '../../views/portal/profile.html',
  styleUrl: '../../styles/portal/profile.scss'
})

export class ProfileComponent implements OnInit {
    constructor(private _usrDta: UserData) {}

    ngOnInit(): void {
        // this.activate();
        //this is just for test purposes
        // this._usrDta.getUsers()
        // this._authSvc.isAdmin()
    }

    activate(): void {
        console.log('profile tab called');
    }

}