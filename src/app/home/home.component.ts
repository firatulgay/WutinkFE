import { Component, OnInit } from '@angular/core';
import {LikeService} from '../services/likeService/like.service';
import {Observable} from 'rxjs';
import {CategoryDto} from '../domain/CategoryDto';
import {WutinkCookieService} from '../services/cookieService/wutink-cookie.service';
import {CategoryService} from '../services/categoryService/category-service.service';
import {JwtModule} from '@auth0/angular-jwt';
import {NavbarService} from '../services/navBarService/navbar.service';
import {RegisterComponent} from '../register/register.component';
import {MatDialog} from '@angular/material';
import {NewPostComponent} from '../new-post/new-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[WutinkCookieService,JwtModule]

})

export class HomeComponent implements OnInit {

  constructor(private navbarService: NavbarService,
              private matDialog: MatDialog) { }

  ngOnInit() {
    this.navbarService.show();
  }

  openPostPopup() {
    const dialogRef = this.matDialog.open(NewPostComponent, {
      role: 'dialog',
      height: '580px',
      width: '580px'
    });
  }
}
