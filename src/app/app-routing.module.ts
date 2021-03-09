import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LandingComponent} from './landing/landing.component';
import {LoginGuard} from './login/login.guard';

const routes: Routes = [
  {path:'login', component : LoginComponent},
  {path:'home', component : LandingComponent, canActivate:[LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
