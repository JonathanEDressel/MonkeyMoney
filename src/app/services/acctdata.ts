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

    private personalActSubject = new BehaviorSubject<PersonalAccountModel | null>(null);
    personalAccounts$: Observable<PersonalAccountModel | null>  = this.personalActSubject.asObservable();

    constructor(private _acctController: AcctController) {}

    ErrorMsg = signal("");

    addPersonalAccount(acctName: string, acctType: string, acctBalance: number): any {
        this._acctController.addPersonalAccount(acctName, acctType, acctBalance).subscribe({
            next: (res: any) => {
                if(res.status === 200) {
                    console.log(`${acctName} added`);
                    var tmp = new PersonalAccountModel();
                    console.log(res);
                    tmp.assignData(res.result);
                    this.personalActSubject.next(tmp);
                    console.log('tmp - ', tmp)
                }
                else {
                    console.warn(`Failed to add account ${acctName}`);
                }
            },
            error: (err: any) => console.log(err)
        });
    }
}