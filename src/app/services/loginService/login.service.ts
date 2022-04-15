import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {EndPoints} from '../../commons/endPoints';
import {tap, catchError} from 'rxjs/operators';
import {UserDto} from '../../domain/UserDto';
import {AlertifyService} from '../alertifyService/alertify.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AuthDto} from '../../domain/AuthDto';
import {ErrorUtilService} from '../error-util.service';
import {LoginHelper} from '../../utils/login-service-singleton.service';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http?: HttpClient,
    private alertifyService?: AlertifyService,
    private router?: Router,
  ) {
  };

  login(user: UserDto) : Observable<AuthDto> {
    let auth = 'Basic ' + btoa(user.userName + ':' + user.password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: auth,
      }),
      withCredentials: true
    };

    return this.http.post<AuthDto>(EndPoints.root + '/doLogin', '', httpOptions)
      .pipe(tap((authResponse) => console.log(JSON.stringify(authResponse))), catchError(this.setError));
  }

  logOut() {
    this.http.post(EndPoints.root + '/doLogout', '', {withCredentials: true})
      .pipe(catchError(this.setError))
      .subscribe(() => {
        this.alertifyService.error('ÇIKIŞ YAPTINIZ');
        this.router.navigate(['login']);
        localStorage.setItem("isLoggedIn","false");
      });
  }

  register(user: UserDto) : Observable<AuthDto> {
    return this.http.post<AuthDto>(EndPoints.root + '/register', user, {withCredentials: true})
      .pipe(tap((authResponse) => console.log(JSON.stringify(authResponse))), catchError(this.setError));

  }

  setError(error) {
    console.log(error);
    return throwError(error);
  }
}
