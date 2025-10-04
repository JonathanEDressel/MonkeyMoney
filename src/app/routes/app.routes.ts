import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../viewmodels/login'
import { CreateAccountComponent } from '../viewmodels/createaccount';
import { MainComponent } from '../viewmodels/main';
import { OverviewComponent } from '../viewmodels/portal/overview';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent },
    { path: 'createaccount', component: CreateAccountComponent },
    { path: 'overview', component: OverviewComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })
// export class AppRoutingModel {}
