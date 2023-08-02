import { Component, OnInit } from '@angular/core';
import {ExperienceDto} from "../domain/ExperienceDto";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../services/searchService/search.service";
import {LikeService} from "../services/likeService/like.service";
import {WutinkCookieService} from "../services/cookieService/wutink-cookie.service";
import {ExperienceService} from "../services/experienceService/experience.service";
import {NavbarService} from "../services/navBarService/navbar.service";
import {MatDialog} from '@angular/material';
import {NewPostComponent} from "../new-post/new-post.component";


@Component({
  selector: 'app-experience-search',
  templateUrl: './experience-search.component.html',
  styleUrls: ['./experience-search.component.scss']
})
export class ExperienceSearchComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
              private searchService:SearchService,
              private router:Router,
              public likeService:LikeService,
              public wutinkCookieService: WutinkCookieService,
              private experienceService:ExperienceService,
              private navbarService: NavbarService,
              private matDialog:MatDialog) { }

  ngOnInit() {
    this.navbarService.show();
    this.searchExperience();
  }

  experienceList : ExperienceDto[];

  searchExperience(){
    this.activatedRoute.queryParams.subscribe(params =>{
      this.searchService.searchExperience(params['search']).subscribe(data =>{this.experienceList=data;});
    } );

  }

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

}
