import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthData } from "../services/authdata";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private _authData: AuthData, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this._authData.isAdmin().pipe(
      map(isAdmin => {
        if (isAdmin)
          return true;
        this._authData.logout();
        return this.router.createUrlTree(['/login']);
      })
    )
  }
}
