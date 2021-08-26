import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPoints } from '../commons/endPoints';
import { AlertifyService } from '../services/alertifyService/alertify.service';
import { LoginService } from '../services/loginService/login.service';
import { UserDto } from '../domain/UserDto';
import {Router} from '@angular/router';
import {RegisterComponent} from '../register/register.component';
import {MatDialog} from '@angular/material';
import {NavbarService} from '../services/navBarService/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})

export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router:Router,
    private matDialog: MatDialog,
    private navbarService : NavbarService
  ) {}

   private loginForm: FormGroup;
   private user: UserDto = new UserDto();

  ngOnInit(): void {
    this.navbarService.hide();
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  openRegisterPopup(): void {
    const dialogRef = this.matDialog.open(RegisterComponent, {
      role: 'dialog',
      height: '480px',
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const {fname, lname, email, password, avatar} = result;

      if (result !== undefined) {
        // this.loginService.SignUp(email, password, fname, lname, avatar);
      }

      return;
    });
  }

  login(){
    if(this.loginForm.valid){
      try {
        this.user = Object.assign({}, this.loginForm.value);
        this.loginService.login(this.user);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
}
