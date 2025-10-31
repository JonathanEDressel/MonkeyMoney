import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AcctData } from '../../services/acctdata';

@Component({
  selector: 'history-root',
  imports: [FormsModule],
  templateUrl: '../../views/portal/accounts.html',
  styleUrl: '../../styles/portal/accounts.scss'
})

export class AccountsComponent {
    constructor(private _acctData: AcctData) {}

    acctName: string = "";
    acctType: string = "";
    acctBalance: number = 0;

    ngOnInit(): void {
        this.activate();
    }

    activate(): void {
        console.log('account tab called');
    }

    addAccount(): void {
        this._acctData.addPersonalAccount(this.acctName, this.acctType, this.acctBalance);
    }
}