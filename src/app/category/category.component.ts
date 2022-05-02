import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/categoryService/category-service.service';
import {CategoryDto} from '../domain/CategoryDto';
import {Router} from '@angular/router';
import {EndPoints} from '../commons/endPoints';
import {ExperienceListingComponent} from '../experience-listing/experience-listing.component';
import {NavbarService} from '../services/navBarService/navbar.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]

})
export class CategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private router:Router,
    private navbarService:NavbarService,
    private _sanitizer: DomSanitizer
  ) { }

  mainCategories: CategoryDto[];

  ngOnInit() {
    this.navbarService.show();
    this.getMainCategories();
  }


  getMainCategories(){

    this.categoryService.getMainCategories().subscribe(data =>{
      this.mainCategories = data;
      this.categoryService.addCatIconSafe(this.mainCategories)
      addCatIconSafe.call(this);
      handleOtherCategory.call(this);
    });

    function addCatIconSafe() {
      this.mainCategories.forEach(cat => {
        let safeResourceUrl = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
          + cat.icon);
        cat.iconSafe = safeResourceUrl;
      });
    }

    function handleOtherCategory() {
      let otherCategory = this.mainCategories.find(value => value.name === 'OTHER');
      let indexOfOther = this.mainCategories.indexOf(this.mainCategories.find(value => value.name === 'OTHER'));
      if (indexOfOther > -1) {
        this.mainCategories.splice(indexOfOther, 1);
      }
      this.mainCategories.push(otherCategory);
    }
  }

  categoryOnClick(name: string, id: number){
    this.router.navigate(['experience/c/'+id])
  }

}
