import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class WutinkCookieService {

  constructor(private cookieService: CookieService,
              private jwtHelper: JwtHelperService) {
  }

  getSessionUser():string {
    let jwtSessionId = this.cookieService.get('jwtSessionId');
    const decodedToken = this.jwtHelper.decodeToken(jwtSessionId);
    return decodedToken.sub;
  }
}
