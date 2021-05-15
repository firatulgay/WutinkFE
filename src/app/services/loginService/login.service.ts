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

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService,
    private router:Router,
    private cookieService: CookieService
  ) {}

   isLoggedIn=false;

  login(user: UserDto) {

    let auth = this.cookieService.get('jwtToken');
    if (auth == null || auth === ""){
     auth = "Basic ZmlyYXQ6MTIzNDU"
        // 'Basic ' + user.userName +':'+ user.password
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: auth
      })
    };

    this.http.post<AuthDto>( EndPoints.root +"/login","",httpOptions)
      .pipe(tap((authResponse) => console.log(JSON.stringify(authResponse))),
        catchError(this.handleError))
      .subscribe((authResponse) => {

        if (authResponse.token != null) {
          this.cookieService.set('jwtToken',authResponse.token);
          this.alertifyService.success("HOŞGELDİNİZ");
          this.router.navigate(['home']);
          this.isLoggedIn=true;
        }else {
          this.alertifyService.error("Kullanıcı Adı Veya Parola Hatalı!");
        }
      });
  }

  logOut(){
    this.cookieService.delete('jwtToken');
    this.isLoggedIn=false;
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";

    if (err.error instanceof ErrorEvent) {
      errorMessage = "An error occured" + err.error.message;
    } else {
      errorMessage = "A systematical error occured";
    }
    return throwError(errorMessage);
  }
}
