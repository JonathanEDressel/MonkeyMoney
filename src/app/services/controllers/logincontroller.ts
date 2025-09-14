import { HttpClient } from '@angular/common/http';

export class LoginController {
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        console.log('uname - ', username, password)
        this.http.post('http://127.0.0.1:8081/users/1', { username: username, password: password })  
            .subscribe({
                next: (res) => console.log('Server res: ', res),
                error: (err) => console.log('ERROR: ', err)
            });
    }
}