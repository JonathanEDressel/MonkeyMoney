import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserController {
    constructor(private http: HttpClient) {}

    addUser(fname: string, lname: string, email: string, password: string) {
        console.log(fname)
        return this.http.post('http://127.0.0.1:5000/user/add', 
            { firstname: fname, lastname: lname, email: email, userpassword: password },
            { observe: 'response' }
        )
    }
}