import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/categoryService/category-service.service';
import {CategoryDto} from '../domain/CategoryDto';
import {Router} from '@angular/router';
import {EndPoints} from '../commons/endPoints';
import {ExperienceListingComponent} from '../experience-listing/experience-listing.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]

})
export class CategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private router:Router
  ) { }

  mainCategories: CategoryDto[];

  ngOnInit() {
    this.getMainCategories();
  }

  getMainCategories(){
    this.categoryService.getMainCategories().subscribe(data =>{
      this.mainCategories = data;
      let otherCategory = this.mainCategories.find(value => value.name ==="Diğer");
      let indexOfOther= this.mainCategories.indexOf(this.mainCategories.find(value => value.name ==="Diğer"));
      if (indexOfOther > -1) {
        this.mainCategories.splice(indexOfOther, 1);
      }

      this.mainCategories.push(otherCategory);
    });
  }

  categoryOnClick(name: string, id: number){
    this.router.navigate(['experience/'+name+'/'+id])
  }

}
