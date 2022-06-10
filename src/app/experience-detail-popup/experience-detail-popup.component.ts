import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LikeService} from '../services/likeService/like.service';
import {WutinkCookieService} from '../services/cookieService/wutink-cookie.service';
import {ExperienceService} from '../services/experienceService/experience.service';
import {NavbarService} from '../services/navBarService/navbar.service';
import {ExperienceDto} from '../domain/ExperienceDto';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-experience-detail-popup',
  templateUrl: './experience-detail-popup.component.html',
  styleUrls: ['./experience-detail-popup.component.scss']
})
export class ExperienceDetailPopupComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
              public likeService:LikeService,
              public wutinkCookieService: WutinkCookieService,
              private experienceService:ExperienceService,
              @Inject(MAT_DIALOG_DATA) public data,
              private router:Router
  ) { }

  ngOnInit() {

    this.getExperienceById(this.data.experienceIdPopup);
  }

  experienceId : number;
  experienceDto : ExperienceDto;

  getExperienceById(experienceId:number){

    this.experienceService.getExperienceById(experienceId).subscribe(data =>{
      this.experienceDto = data;
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

}
