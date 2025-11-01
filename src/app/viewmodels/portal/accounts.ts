import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AcctData } from '../../services/acctdata';
import { Observable } from 'rxjs';
import { PersonalAccountModel } from '../../models/personalaccountmodel';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'history-root',
  imports: [FormsModule, AsyncPipe],
  templateUrl: '../../views/portal/accounts.html',
  styleUrl: '../../styles/portal/accounts.scss'
})

export class AccountsComponent {
    acctName: string = "";
    acctType: string = "";
    acctBalance: number = 0;
    personalAccts$: Observable<PersonalAccountModel[]>;

    constructor(private _acctData: AcctData) {
        this.personalAccts$ = _acctData.personalAccounts$;
    }

    clearInputs(): void {
        this.acctBalance = 0;
        this.acctType = "";
        this.acctName = "";
        console.log('clear')
    }

    ngOnInit(): void {
        this.activate();
        this._acctData.getPersonalAccounts();
    }

    activate(): void {
        console.log('account tab called');
    }

    addAccount(): void {
        this._acctData.addPersonalAccount(this.acctName, this.acctType, this.acctBalance);
        this.clearInputs();
    }
}