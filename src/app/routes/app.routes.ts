import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../viewmodels/login'
import { CreateAccountComponent } from '../viewmodels/createaccount';
import { MainComponent } from '../viewmodels/main';
// import { OverviewComponent } from '../viewmodels/portal/overview';
// import { HistoryComponent } from '../viewmodels/portal/userlogs';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent },
    { path: 'createaccount', component: CreateAccountComponent },
    // { path: 'overview', component: OverviewComponent },
    // { path: 'history', component: HistoryComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })
// export class AppRoutingModel {}
