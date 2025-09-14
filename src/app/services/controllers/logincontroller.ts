import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginController {
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        console.log('uname - ', username, password)
        this.http.post('http://192.168.4.89:5000/users/login', { username: username, password: password })  
            .subscribe({
                next: (res) => console.log('Server res: ', res),
                error: (err) => console.log('ERROR: ', err)
            });
    }
}