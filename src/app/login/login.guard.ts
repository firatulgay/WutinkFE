import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { from } from "rxjs";
import {LoginService} from '../services/loginService/login.service';
import {CookieService} from 'ngx-cookie-service';



@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private loginService:LoginService,
                private cookieService: CookieService
    ) { };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      let auth = this.cookieService.get('jwtSessionId');
      if (auth == null || auth === ""){

        this.router.navigate(["login"]);
        return false;
      }
      return true;
    }
}
