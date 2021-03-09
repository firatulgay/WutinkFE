import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { from } from "rxjs";
import {LoginService} from '../services/loginService/login.service';



@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private loginService:LoginService) { };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('isLoggedIn')) {
            return true;}

        this.router.navigate(["login"]);
        return false;
    }
}
