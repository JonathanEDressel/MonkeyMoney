import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthController {
    constructor(private http: HttpClient) {}

    private apiURL = 'http://127.0.0.1:5000/auth'

    login(username: string, password: string) {
        return this.http.post<{ token: string }>(`${this.apiURL}/login`, { 
            username: username, userpassword: password 
        });
    }

    createAccount(fname: string, lname: string, email: string, password: string, phonenumber: string) {
        return this.http.post<{ token: string }>(`${this.apiURL}/signup`, { 
            firstname: fname, lastname: lname, email: email, userpassword: password, phonenumber: phonenumber 
        });
    }

    isAdmin(): Observable<any> {
        return this.http.get<{token: string}>(`${this.apiURL}/isAdmin`);
    }
}