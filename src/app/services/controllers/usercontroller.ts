import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserController {
    constructor(private http: HttpClient) {}

    private apiURL = 'http://127.0.0.1:5000/user'

    getUsers() {
      return this.http.get<{token: string}>(`${this.apiURL}/users`);
    }

    getUser() {
      return this.http.get<{token: string}>(`${this.apiURL}/user`);
    }
}