import { Component, OnInit } from '@angular/core';
import {LikeService} from '../services/likeService/like.service';
import {Observable} from 'rxjs';
import {CategoryDto} from '../domain/CategoryDto';
import {WutinkCookieService} from '../services/cookieService/wutink-cookie.service';
import {CategoryService} from '../services/categoryService/category-service.service';
import {JwtModule} from '@auth0/angular-jwt';
import {NavbarService} from '../services/navBarService/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[WutinkCookieService,JwtModule]

})

export class HomeComponent implements OnInit {

  constructor(public likeService:LikeService,
              public wutinkCookieService: WutinkCookieService,
              private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.show();
  }

  likeEvent(event: any){
    if (event.currentTarget.checked){
      this.likeService.likeExperience(1,this.wutinkCookieService.getSessionUser()).subscribe(data => {
     });
    }
    else {
        this.likeService.unlikeExperience(1,this.wutinkCookieService.getSessionUser()).subscribe(data => {
        });
    }
  }
}
