import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.services";
import { AuthController } from "../services/controllers/authcontroller";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authServices: AuthService, private _authController: AuthController, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authServices.isAuthenticated())
      return true;
    return this.router.createUrlTree(['/login']);
  }
}