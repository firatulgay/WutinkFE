import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/loginService/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.loginService.logOut();
    this.router.navigate(['login'])
  }

}
