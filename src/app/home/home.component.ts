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
import {ActivatedRoute, Router} from '@angular/router';
import {ExperienceService} from '../services/experienceService/experience.service';
import {ExperienceDto} from '../domain/ExperienceDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[WutinkCookieService,JwtModule]

})

export class HomeComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
              private router:Router,
              public likeService:LikeService,
              public wutinkCookieService: WutinkCookieService,
              private experienceService:ExperienceService,
              private navbarService: NavbarService,
              private matDialog:MatDialog) { }

  ngOnInit() {
    this.navbarService.show()
    this.loadInitialExperiences();
  }

  categoryId : number;
  experienceList : ExperienceDto[];
  page:number = 0;
  size:number = 12;
  isLoadMoreBtnVisible = true;


  likeExperienceEvent(event: any, experienceId: number){
    if (event.currentTarget.checked){
      this.likeService.likeExperience(experienceId).subscribe(data => {
      });
    }
    else {
      this.likeService.unlikeExperience(experienceId).subscribe(data => {
      });
    }
  }
  openPostPopup() {
    const dialogRef = this.matDialog.open(NewPostComponent, {
      role: 'dialog',
      height: '580px',
      width: '580px'
    });
  }

  loadMoreExperiences(){
    this.page ++;
    this.experienceService.getAllExperiencesByPage(this.page,this.size).subscribe(data => {
      console.log(data);
      this.isLoadMoreBtnVisible = data.length >= 12;
      data.forEach(experienceDto => this.experienceList.push(experienceDto));
    });
  }

  loadInitialExperiences() {
    this.page = 0;
    this.experienceService.getAllExperiencesByPage(this.page,this.size).subscribe(data => {
      console.log(data);
      this.isLoadMoreBtnVisible = data.length >= 12;
      this.experienceList = data;
    });
  }
}
