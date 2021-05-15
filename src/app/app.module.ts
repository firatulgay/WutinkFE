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
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    HomeComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService,LoginGuard,AlertifyService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
