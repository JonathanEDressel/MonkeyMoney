import { Injectable, Signal, signal } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { AcctController } from "./controllers/acctcontroller";
import { Router } from "@angular/router";
import { PersonalAccountModel } from "../models/personalaccountmodel";

@Injectable({
    providedIn: 'root'
})
export class AcctData {

    userPersonalAccounts: PersonalAccountModel[] = [];

    private personalActSubject = new BehaviorSubject<PersonalAccountModel[]>([]);
    personalAccounts$: Observable<PersonalAccountModel[]>  = this.personalActSubject.asObservable();

    constructor(private _acctController: AcctController) {}

    ErrorMsg = signal("");

    addPersonalAccount(acctName: string, acctType: string, acctBalance: number): any {
        this._acctController.addPersonalAccount(acctName, acctType, acctBalance).subscribe({
            next: (res: any) => {
                if(res.status === 200) {
                    console.log(`${acctName} added`);
                    var tmp = new PersonalAccountModel();
                    tmp.assignData(res.result);
                    
                    const accounts = this.personalActSubject.value;
                    this.personalActSubject.next([...accounts, tmp]);
                }
                else {
                    console.warn(`Failed to add account ${acctName}`);
                }
            },
            error: (err: any) => console.error(err)
        });
    }

    getPersonalAccounts(): any {
        this._acctController.getPersonalAccounts().subscribe({
            next: (res: any) => {
                if(res.status === 200) {
                    const accounts: PersonalAccountModel[] = [];
                    var data = res.result;
                    for(var i = 0; i < data.length; i++) {
                        var acct = new PersonalAccountModel();
                        acct.assignData(data[i]);
                        accounts.push(acct);
                    }
                    this.personalActSubject.next(accounts);
                }
                else
                    console.warn('Failed to get accounts');
            },
            error: (err: any) => console.error(err)
        })
    }
}