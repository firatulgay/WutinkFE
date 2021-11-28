import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { EndPoints } from "../../commons/endPoints";
import { tap, catchError } from "rxjs/operators";
import {UserDto } from "../../domain/UserDto";
import { AlertifyService } from "../alertifyService/alertify.service";
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AuthDto} from '../../domain/AuthDto';
import {MatDialog} from '@angular/material';
import {NavbarService} from '../navBarService/navbar.service';

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService,
    private router:Router,
    private cookieService: CookieService,
    private matDialog: MatDialog
  ) {}

   isLoggedIn=false;

  login(user: UserDto) {
    let auth = 'Basic ' + btoa(user.userName + ":"+ user.password)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: auth
      })
    };

    this.http.post<AuthDto>(EndPoints.root + '/login', '', httpOptions)
      .pipe(tap((authResponse) => console.log(JSON.stringify(authResponse))),
        catchError(this.handleError))
      .subscribe((authResponse) => {
        this.cookieService.set('jwtSessionId', authResponse.token, 1, '/', 'localhost', true, 'Lax');
        this.alertifyService.success('HOŞGELDİNİZ');
        this.router.navigate(['categories']);
        this.isLoggedIn = true;
      });
  }

  logOut(){
    this.cookieService.delete('jwtSessionId');
    this.isLoggedIn=false;
  }

  register(user : UserDto){
    this.http.post<AuthDto>( EndPoints.root +"/register",user)
      .pipe(tap((authResponse) => console.log(JSON.stringify(authResponse))),
        catchError(this.handleError))
      .subscribe((authResponse) => {

        if (authResponse.success) {
          this.cookieService.set('jwtToken',authResponse.token);
          this.alertifyService.success(authResponse.globalMessage.message);
          this.router.navigate(['home']);
          this.isLoggedIn=true;
          this.matDialog.closeAll();

        }else {
          this.alertifyService.error(authResponse.globalMessage.message);
        }
      });

  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";

    if (err.error instanceof ErrorEvent) {
      errorMessage = "An error occured" + err.error.message;
    } else {
      errorMessage = "A systematical error occured" + err.message;
    }
    return throwError(errorMessage);
  }
}
