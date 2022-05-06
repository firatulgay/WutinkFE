import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../services/navBarService/navbar.service';
import {CategoryService} from '../services/categoryService/category-service.service';
import {CategoryDto} from '../domain/CategoryDto';
import {ActivatedRoute, Router} from '@angular/router';
import {ExperienceService} from '../services/experienceService/experience.service';
import {ExperienceDto} from '../domain/ExperienceDto';
import {NewPostComponent} from '../new-post/new-post.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private navbarService: NavbarService,
              private categoryService:CategoryService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private experienceService:ExperienceService,
              private matDialog:MatDialog) { }

  ngOnInit() {
    this.navbarService.show();
    this.username = this.activatedRoute.snapshot.params['username'];
    this.getAllCategories();
    this.getAllExperiencesByUsername();
  }

  username : string;
  mainCategories:CategoryDto[];
  experienceList:ExperienceDto[];

  getAllCategories(){
    this.categoryService.getMainCategories().subscribe(data => {
      this.mainCategories=data;
      this.categoryService.addCatIconSafe(this.mainCategories);
    })
  }
  getAllExperiencesByUsername(){
    this.experienceService.getAllExperiencesByUsername(this.username).subscribe(data => {
      this.experienceList=data;
    });
  }

  openPostPopup() {
    const dialogRef = this.matDialog.open(NewPostComponent, {
      role: 'dialog',
      height: '580px',
      width: '580px'
    });
  }
}
