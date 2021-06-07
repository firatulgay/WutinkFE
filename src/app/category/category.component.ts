import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/categoryService/category-service.service';
import {CategoryDto} from '../domain/CategoryDto';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]

})
export class CategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService
  ) { }

  mainCategories: CategoryDto[];

  ngOnInit() {
    this.getMainCategoriess();
  }

  getMainCategoriess(){
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

}
