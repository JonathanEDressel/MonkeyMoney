import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "./services/auth.services";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authServices: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authServices.isAuthenticated())
      return true;
    return this.router.createUrlTree(['/login']);
  }
}