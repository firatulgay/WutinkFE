import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LikeService} from '../services/likeService/like.service';
import {WutinkCookieService} from '../services/cookieService/wutink-cookie.service';
import {ExperienceService} from '../services/experienceService/experience.service';
import {ExperienceDto} from '../domain/ExperienceDto';
import {NavbarService} from '../services/navBarService/navbar.service';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.scss']
})
export class ExperienceDetailComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
              private router:Router,
              public likeService:LikeService,
              public wutinkCookieService: WutinkCookieService,
              private experienceService:ExperienceService,
              private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.show();
    this.experienceId = this.activatedRoute.snapshot.params['experienceId'];
    this.getExperienceById(this.experienceId);
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
