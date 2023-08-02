import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/loginService/login.service';
import { LoginGuard } from './login/login.guard';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AlertifyService } from './services/alertifyService/alertify.service';
import { HomeComponent } from './home/home.component';
import {CookieService} from 'ngx-cookie-service';
import { CategoryComponent } from './category/category.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import {MatDialogModule, MatFormFieldModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import { ExperienceListingComponent } from './experience-listing/experience-listing.component';
import {ExperienceService} from './services/experienceService/experience.service';
import { ExperienceDetailComponent } from './experience-detail/experience-detail.component';
import {CommentComponent} from './comment/comment.component';
import {CommentService} from './services/commentService/comment.service';
import {AuthInterceptor} from './auth/authInterceptor';
import { ErrorUtilComponent } from './utils/error-util/error-util.component';
import { WarningUtilComponent } from './utils/warning-util/warning-util/warning-util.component';
import {NewPostComponent} from './new-post/new-post.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ExperienceDetailPopupComponent } from './experience-detail-popup/experience-detail-popup.component';
import { ExperienceSearchComponent } from './experience-search/experience-search.component';
import {RouteReuseStrategy} from "@angular/router";
import {CustomRouteReuseStrategy} from "./utils/CustomRouteReuseStrategy";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CategoryComponent,
    NavComponent,
    RegisterComponent,
    ExperienceListingComponent,
    ExperienceDetailComponent,
    CommentComponent,
    ErrorUtilComponent,
    WarningUtilComponent,
    NewPostComponent,
    UserProfileComponent,
    ExperienceDetailPopupComponent,
    ExperienceSearchComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),
    MatFormFieldModule,
  ],
  providers: [LoginService,LoginGuard,AlertifyService,CookieService,JwtModule,JwtHelperService,ExperienceService,CommentService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },{ provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
