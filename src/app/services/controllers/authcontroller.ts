import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthController {
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post('http://127.0.0.1:5000/auth/login', 
            { username: username, userpassword: password },
            { observe: 'response' }
        )
    }

    addUser(fname: string, lname: string, email: string, password: string, phonenumber: string) {
        console.log(fname)
        return this.http.post('http://127.0.0.1:5000/auth/signup', 
            { firstname: fname, lastname: lname, email: email, userpassword: password, phonenumber: phonenumber },
            { observe: 'response' }
        )
    }
}