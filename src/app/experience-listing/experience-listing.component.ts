import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LikeService} from '../services/likeService/like.service';
import {WutinkCookieService} from '../services/cookieService/wutink-cookie.service';
import {ExperienceService} from '../services/experienceService/experience.service';
import {ExperienceDto} from '../domain/ExperienceDto';
import {NavbarService} from '../services/navBarService/navbar.service';
import {NewPostComponent} from '../new-post/new-post.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-experience-listing',
  templateUrl: './experience-listing.component.html',
  styleUrls: ['./experience-listing.component.scss']
})
export class ExperienceListingComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
              private router:Router,
              public likeService:LikeService,
              public wutinkCookieService: WutinkCookieService,
              private experienceService:ExperienceService,
              private navbarService: NavbarService,
              private matDialog:MatDialog) { }

  ngOnInit() {
    this.navbarService.show()
    this.categoryId = this.activatedRoute.snapshot.params['categoryId'];
    this.getAllExperiencesByCategoryId(this.categoryId);
  }

  categoryId : number;
  experienceList : ExperienceDto[];

  getAllExperiencesByCategoryId(categoryId:number){

    this.experienceService.getAllExperiencesByCategoryId(categoryId).subscribe(data =>{
      this.experienceList = data;
    });

  }

  likeEvent(event: any, experienceId: number){
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
}
