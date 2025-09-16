import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginController {
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        this.http.post('http://192.168.4.89:5000/login', 
            { username: username, userpassword: password },
            { observe: 'response' }
        ).subscribe({
            next: (res) => {
                if(res.status === 200)
                    alert("Successful!")
            },
            error: (err) => console.log('ERROR: ', err)
        });
    }
}