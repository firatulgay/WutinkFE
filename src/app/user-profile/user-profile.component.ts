import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../services/navBarService/navbar.service';
import {CategoryService} from '../services/categoryService/category-service.service';
import {CategoryDto} from '../domain/CategoryDto';
import {ActivatedRoute, Router} from '@angular/router';
import {ExperienceService} from '../services/experienceService/experience.service';
import {ExperienceDto} from '../domain/ExperienceDto';
import {NewPostComponent} from '../new-post/new-post.component';
import {MatDialog} from '@angular/material';
import {ExperienceDetailPopupComponent} from '../experience-detail-popup/experience-detail-popup.component';
import {UserService} from '../services/userService/user.service';
import {UserDto} from '../domain/UserDto';

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
              private matDialog:MatDialog,
              private userService:UserService) { }

  ngOnInit() {
    this.navbarService.show();
    this.username = this.activatedRoute.snapshot.params['username'];
    this.getAllCategories();
    this.getAllExperiencesByUsername();

    this.userService.getCurrentAuthUser().subscribe(data => {
      this.currentUser = data.userName;
      console.log("current user data -> " + this.currentUser)
      console.log("profile user data -> " + this.username)
      this.isCurrentUser = this.currentUser === this.username;
      console.log("iscurrentuser " + this.isCurrentUser)
    });
  }

  username : string;
  mainCategories:CategoryDto[];
  experienceList:ExperienceDto[];
  currentUser: string; // The authenticated user
  userProfile: string; // The user whose profile is being viewed
  isCurrentUser: boolean;

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

  openExperiencePopup(experienceIdPopup:number) {
    const dialogRef = this.matDialog.open(ExperienceDetailPopupComponent, {
      role: 'dialog',
      height: '500px',
      width: '750px',
      data:{experienceIdPopup:experienceIdPopup},
    });
  }

  deleteExperience(id: number) {
    this.experienceService.deleteExperienceById(id).subscribe(
      () => {
        window.location.reload();
      },
      (error) => {
        // Handle error here, you can display the error message to the user
        console.error('Delete error:', error);
        // Display an error message to the user using MatSnackBar or Toastr
        // this.snackBar.open(error, 'Close', { duration: 5000 });
      }
    );

  }
}
