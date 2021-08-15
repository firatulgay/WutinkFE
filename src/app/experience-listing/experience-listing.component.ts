import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LikeService} from '../services/likeService/like.service';
import {WutinkCookieService} from '../services/cookieService/wutink-cookie.service';
import {ExperienceService} from '../services/experienceService/experience.service';
import {ExperienceDto} from '../domain/ExperienceDto';

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
              private experienceService:ExperienceService) { }

  ngOnInit() {

    this.categoryName = this.activatedRoute.snapshot.params['categoryName'];
    this.categoryId = this.activatedRoute.snapshot.params['categoryId'];

  }

  categoryName : string;
  categoryId : number;
  experienceList : ExperienceDto[];

  getAllExperiencesByCategoryId(categoryId:number){

    this.experienceService.getAllExperiencesByCategoryId(categoryId).subscribe(data =>{
      this.experienceList = data;
    });

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
