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
import {ErrorUtilService} from '../services/error-util.service';
import {BaseDto} from '../commons/baseDto';
import {AuthDto} from '../domain/AuthDto';
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

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
    private navbarService : NavbarService,
    private errorUtilService : ErrorUtilService,
  ) {}

   private loginForm: FormGroup;
   private user: UserDto = new UserDto();
   private authDto:Observable<AuthDto> ;
  errMessage:string;


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
        this.user = Object.assign({}, this.loginForm.value);
        this.loginService.login(this.user).subscribe(authResponse => {
          if (!authResponse.success){
            this.errMessage = authResponse.globalMessage.message;
          }else {
            this.loginService.isLoggedIn = true;
            this.router.navigate(['categories']);
          }
        },error => {

          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.errMessage = "Hatalı kullanıcı adı veya parola!";
            }
            return;
          }
          this.errMessage = "Bilinmeyen bir hata oluştu. Daha sonra tekrar deneyin.";
        });
    }
  }
}
