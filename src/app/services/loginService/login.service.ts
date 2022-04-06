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
import {MatDialog} from '@angular/material';
import {NavbarService} from '../navBarService/navbar.service';
import {ErrorUtilService} from '../error-util.service';
import {ErrorUtilComponent} from '../../utils/error-util/error-util.component';
import {CategoryDto} from '../../domain/CategoryDto';
import {BaseDto} from '../../commons/baseDto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router,
    private cookieService: CookieService,
    private matDialog: MatDialog,
    private errorUtilService: ErrorUtilService
  ) {
  }

  isLoggedIn = false;
  errorMessage: any;
  authDto: AuthDto = new AuthDto();

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
        this.isLoggedIn = false;
      });
  }

  register(user: UserDto) {
    this.http.post<AuthDto>(EndPoints.root + '/register', user, {withCredentials: true})
      .pipe(
        tap((authResponse) => console.log(JSON.stringify(authResponse))),
        catchError(this.setError))
      .subscribe((authResponse) => {

        if (authResponse.success) {
          this.cookieService.set('jwtToken', authResponse.token);
          this.alertifyService.success(authResponse.globalMessage.message);
          this.router.navigate(['home']);
          this.isLoggedIn = true;
          this.matDialog.closeAll();

        } else {
          this.alertifyService.error(authResponse.globalMessage.message);
        }
      });

  }

  setError(error) {
    console.log(error);
    return throwError(error);
  }
}
