import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class UserController {
    constructor(private http: HttpClient) {}

    private apiURL = environment.apiUrl + '/user';

    getUsers() {
      return this.http.get<{token: string}>(`${this.apiURL}/users`);
    }

    getUser() {
      return this.http.get<{token: string}>(`${this.apiURL}/user`);
    }
}