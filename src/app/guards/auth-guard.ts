import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthData } from "../services/authdata";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private _authData: AuthData, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this._authData.isAuthenticated())
      return true;
    return this.router.createUrlTree(['/login']);
  }
}