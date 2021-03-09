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

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService,
    private router:Router
  ) {}

   isLoggedIn=false;

  login(user: UserDto) {

    this.http.get<UserDto>( EndPoints.root +"/login" + "?userName=" +user.userName + "&password=" +user.password)
      .pipe(tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError))
      .subscribe((data) => {

        if (data.userName != null) {
          localStorage.setItem("isLoggedIn","true")
          this.alertifyService.success(data.globalMessage.confMessage);
          this.router.navigate(['home']);
          this.isLoggedIn=true;
        }else {
          this.alertifyService.error(data.globalMessage.errorMessage);
        }
      });
  }

  logOut(){
    localStorage.removeItem("isLoggedIn");
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
