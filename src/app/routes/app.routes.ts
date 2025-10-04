import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../viewmodels/login'
import { CreateAccountComponent } from '../viewmodels/createaccount';
import { MainComponet } from '../viewmodels/main';
import { OverviewComponet } from '../viewmodels/portal/overview';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponet },
    { path: 'createaccount', component: CreateAccountComponent },
    { path: 'overview', component: OverviewComponet},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })
// export class AppRoutingModel {}
