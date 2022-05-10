import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/loginService/login.service';
import {Router} from '@angular/router';
import {NavbarService} from '../services/navBarService/navbar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router:Router,
              private navbarService:NavbarService) { }


  ngOnInit() {
  }

  username:string;

  logout(){
    this.loginService.logOut();
  }

  onProfileClick(){
    this.username = localStorage.getItem("username");
    this.router.navigate(['profile/'+ this.username])
  }
}
