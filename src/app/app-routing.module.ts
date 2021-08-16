import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from './login/login.guard';
import {HomeComponent} from './home/home.component';
import {CategoryComponent} from './category/category.component';
import {RegisterComponent} from './register/register.component';
import {ExperienceListingComponent} from './experience-listing/experience-listing.component';

const routes: Routes = [
  {path:'login', component : LoginComponent},
  {path:'home', component : HomeComponent}, //canActivate:[LoginGuard] will be added later
  {path:'categories', component : CategoryComponent},
  {path:'register', component : RegisterComponent},
  {path:'experience/:categoryName/:categoryId', component : ExperienceListingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
