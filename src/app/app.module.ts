import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import {MatDialogModule} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import { ExperienceListingComponent } from './experience-listing/experience-listing.component';
import {ExperienceService} from './services/experienceService/experience.service';
import { ExperienceDetailComponent } from './experience-detail/experience-detail.component';

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
    ExperienceDetailComponent ,],
  imports: [
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
        allowedDomains: ["localhost"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [LoginService,LoginGuard,AlertifyService,CookieService,JwtModule,JwtHelperService,ExperienceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
