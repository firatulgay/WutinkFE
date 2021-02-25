import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { from } from "rxjs";



@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private router: Router) { };


    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // let logged = this.accountService.isUserLoggedIn();
        // if (logged) {
        //     return true;
        // }

        this.router.navigate(["login"]);
        return false;
    }
}