import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../viewmodels/login'
import { HomeComponent } from '../viewmodels/home';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModel {}
