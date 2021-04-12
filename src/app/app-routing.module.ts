import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LandingComponent} from './landing/landing.component';
import {LoginGuard} from './login/login.guard';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path:'login', component : LoginComponent},
  {path:'home', component : HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
