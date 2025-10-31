import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class AuthController {
    constructor(private http: HttpClient) {}

    private apiURL = environment.apiUrl + '/act';

    addPersonalAccount(acctName: string, acctType: string, acctBalance: number) {
        return this.http.post<{ token: string }>(`${this.apiURL}/login`, { 
            name: acctName,
            type: acctType,
            balance: acctBalance
        });
    }
}