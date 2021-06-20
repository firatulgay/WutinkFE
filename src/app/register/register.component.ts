import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDto} from '../domain/UserDto';
import {LoginService} from '../services/loginService/login.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router:Router) { }

  private registerForm: FormGroup;
  private user: UserDto = new UserDto();

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(){
    if(this.registerForm.valid){
      try {
        this.user = Object.assign({}, this.registerForm.value);
        this.loginService.register(this.user);

      } catch (error) {
        console.log(error.message);
      }
    }
  }

}
