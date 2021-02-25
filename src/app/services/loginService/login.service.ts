import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { EndPoints } from "../../commons/EndPoints";
import { tap, catchError } from "rxjs/operators";
import { User } from "../../login/User";
import { AlertifyService } from "../alertifyService/alertify.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService
  ) {}

  // loginPath:string = EndPoints.login

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Token",
      }),
    };

    this.http
      .get<User>( "http://localhost:8080/login" + "?userName=" +user.userName + "&password=" +user.password, httpOptions)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      )
      .subscribe((data) => {
        if (data.userName != null) {
          this.alertifyService.success("HOŞGELDİNİZ");
        } else {
          this.alertifyService.error("Kullanıcı adı veya Parola hatalı!");
        }
      });
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
