import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ExperienceDto} from '../domain/ExperienceDto';
import {IDropdownSettings, MultiSelectComponent} from 'ng-multiselect-dropdown';
import {CategoryService} from '../services/categoryService/category-service.service';
import {CategoryDto} from '../domain/CategoryDto';
import {CategoryDropdownDto} from '../domain/CategoryDropdownDto';
import {ListItem} from 'ng-multiselect-dropdown/multiselect.model';
import {ExperienceService} from '../services/experienceService/experience.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor(private categoryService:CategoryService,
              private experienceService:ExperienceService,
              private matDialog:MatDialog) { }
  dropdownList = [];
  dropdownSettings = {};
  mainCategories: CategoryDto[];
  categoryDropdownDtoList:CategoryDropdownDto[];


  experienceForm = new FormGroup({
    header: new FormControl(),
    categories:new FormControl(),
    description:new FormControl()
  });

  ngOnInit() {
    this.fillCategoryDropdown();
  }

  createNewExperience() {
    let categoryIdList = [];

    this.categoryDropdownDtoList = this.experienceForm.value.categories;
    this.categoryDropdownDtoList.forEach(value => categoryIdList.push(value.item_id));

    let experienceDto = new ExperienceDto();
    experienceDto.header = this.experienceForm.value.header;
    experienceDto.categoryIdList = categoryIdList;
    experienceDto.description = this.experienceForm.value.description;

    this.experienceService.saveExperience(experienceDto).subscribe(experienceResponse => {
      console.log('Experience Response');
      console.log(experienceResponse);
    });

    this.matDialog.closeAll();
    window.location.reload();
  }

  fillCategoryDropdown(){

    this.categoryService.getCategoriesForDropdown().subscribe(categoriesData => {
      this.dropdownList=categoriesData;
    });

    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text'
    };
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }

  onItemDeSelect(item: any) {
    console.log('onItemDeSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onUnSelectAll() {
    console.log('onUnSelectAll fires');
  }
}

