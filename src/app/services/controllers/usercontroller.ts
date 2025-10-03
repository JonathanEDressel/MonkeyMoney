import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserController {
    constructor(private http: HttpClient) {}

    getUsers() {
        return this.http.get('http://127.0.0.1:5000/user/users',
            { observe: 'response' }
        )
    }

    addUser(fname: string, lname: string, email: string, password: string) {
        return this.http.post('http://127.0.0.1:5000/user/add', 
            { firstname: fname, lastname: lname, email: email, userpassword: password },
            { observe: 'response' }
        )
    }
}