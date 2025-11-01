import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class AcctController {
    constructor(private http: HttpClient) {}

    private apiURL = environment.apiUrl + '/act';

    addPersonalAccount(acctName: string, acctType: string, acctBalance: number) {
        return this.http.post<{ token: string }>(`${this.apiURL}/add/personal`, { 
            name: acctName,
            type: acctType,
            balance: acctBalance
        });
    }

    getPersonalAccounts(): any {
        return this.http.get<{token: string}>(`${this.apiURL}/personal`);
    }
}