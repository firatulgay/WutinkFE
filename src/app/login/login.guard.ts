import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { from } from "rxjs";
import {LoginService} from '../services/loginService/login.service';
import {CookieService} from 'ngx-cookie-service';
import {LoginHelper} from '../utils/login-service-singleton.service';



@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private loginService:LoginService,
                private cookieService: CookieService
    ) { };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      let isloggedIn = LoginHelper.isLoggedIn;

      if (!isloggedIn){
        this.router.navigate(["login"]);
      }

      return isloggedIn;
    }
}
