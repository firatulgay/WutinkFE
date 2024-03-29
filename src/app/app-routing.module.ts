import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from './login/login.guard';
import {HomeComponent} from './home/home.component';
import {CategoryComponent} from './category/category.component';
import {RegisterComponent} from './register/register.component';
import {ExperienceListingComponent} from './experience-listing/experience-listing.component';
import {ExperienceDetailComponent} from './experience-detail/experience-detail.component';
import {NewPostComponent} from './new-post/new-post.component';
import {CommentComponent} from './comment/comment.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ExperienceDetailPopupComponent} from './experience-detail-popup/experience-detail-popup.component';
import {ExperienceSearchComponent} from "./experience-search/experience-search.component";

const routes: Routes = [
  {path:'login', component : LoginComponent},
  {path:'home', component : HomeComponent}, //canActivate:[LoginGuard] will be added later
  {path:'categories', component : CategoryComponent ,canActivate:[LoginGuard]} ,
  {path:'register', component : RegisterComponent},
  {path:'experience/c/:categoryId', component : ExperienceListingComponent},
  {path:'experience', component : ExperienceSearchComponent},
  {path:'experience/e/:experienceId', component : ExperienceDetailComponent},
  {path:'new-post', component : NewPostComponent},
  {path:'comments', component:CommentComponent},
  {path:'profile/:username', component:UserProfileComponent},
  {path:'experienceDetail', component:ExperienceDetailPopupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
