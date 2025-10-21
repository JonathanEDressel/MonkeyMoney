import { Routes } from '@angular/router';
import { LoginComponent } from '../viewmodels/login'
import { CreateAccountComponent } from '../viewmodels/createaccount';
import { MainComponent } from '../viewmodels/main';
import { AuthGuard } from '../auth-guard';
import { ForgotPassword } from '../viewmodels/forgotpassword';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'createaccount', component: CreateAccountComponent },
    { path: 'forgotpassword', component: ForgotPassword },
    { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];