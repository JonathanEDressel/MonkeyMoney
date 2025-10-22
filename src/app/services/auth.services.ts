import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root'})
export class AuthService {
    private tokenKey = 'jwt';

    constructor(private router: Router) {}

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    clearToken(): void {
        localStorage.removeItem(this.tokenKey);
    }

    decodeToken(token: string): any | null {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch {
            return null;
        }
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token)
            return false;
        
        const payload = this.decodeToken(token);
        if (payload && payload.exp && (Date.now()) >= (payload.exp * 1000)) {
            this.logout();
            return false;
        }
        return true;
    }

    logout(): void {
        this.clearToken();
        this.router.navigate(['/login']);
    }
}