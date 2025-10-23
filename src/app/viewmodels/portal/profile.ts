import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserData } from '../../services/userdata';
import { AuthData } from '../../services/authdata';

@Component({
  selector: 'overview-root',
  imports: [FormsModule],
  templateUrl: '../../views/portal/profile.html',
  styleUrl: '../../styles/portal/profile.scss'
})

export class ProfileComponent implements OnInit {
    constructor(private _usrDta: UserData, private _authDta: AuthData) {}

    ngOnInit(): void {
        // this.activate();
        //this is just for test purposes
        // this._usrDta.getUsers()
        this._authDta.isAdmin()
    }

    activate(): void {
        console.log('profile tab called');
    }

}