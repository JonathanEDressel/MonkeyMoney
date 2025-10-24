import { Injectable } from "@angular/core";
import { AuthController } from "../services/controllers/authcontroller";
import { CanActivate, Router, UrlTree } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authController: AuthController, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authController.isAdmin()) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
}
