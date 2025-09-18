import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginController {
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post('http://127.0.0.1:5000/auth/login', 
            { username: username, userpassword: password },
            { observe: 'response' }
        )
    }
}