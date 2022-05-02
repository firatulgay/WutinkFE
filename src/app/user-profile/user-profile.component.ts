import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../services/navBarService/navbar.service';
import {CategoryService} from '../services/categoryService/category-service.service';
import {CategoryDto} from '../domain/CategoryDto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private navbarService: NavbarService,
              private categoryService:CategoryService,
              private router:Router) { }

  ngOnInit() {
    this.navbarService.show();
    this.getAllCategories();
  }

  mainCategories:CategoryDto[];

  getAllCategories(){
    this.categoryService.getMainCategories().subscribe(data => {
      this.mainCategories=data;
      this.categoryService.addCatIconSafe(this.mainCategories);
    })
  }

  navigateToCategory(id: number) {

  }
}
