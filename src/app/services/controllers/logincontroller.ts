import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginController {
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        this.http.post('http://192.168.4.89:5000/login', { username: username, password: password })  
            .subscribe({
                next: (res) => console.log('Server res: ', res),
                error: (err) => console.log('ERROR: ', err)
            });
    }
}