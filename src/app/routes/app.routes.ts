import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../viewmodels/login'
import { CreateAccountComponent } from '../viewmodels/createaccount';
import { MainComponent } from '../viewmodels/main';
import { AuthGuard } from '../auth-guard';
// import { OverviewComponent } from '../viewmodels/portal/overview';
// import { HistoryComponent } from '../viewmodels/portal/userlogs';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'createaccount', component: CreateAccountComponent },
    // { path: 'overview', component: OverviewComponent },
    // { path: 'history', component: HistoryComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })
// export class AppRoutingModel {}
