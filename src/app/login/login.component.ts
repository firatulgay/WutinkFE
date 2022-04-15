import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/loginService/login.service';
import { UserDto } from '../domain/UserDto';
import {Router} from '@angular/router';
import {RegisterComponent} from '../register/register.component';
import {MatDialog} from '@angular/material';
import {NavbarService} from '../services/navBarService/navbar.service';
import {ErrorUtilService} from '../services/error-util.service';
import {AuthDto} from '../domain/AuthDto';
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginHelper} from '../utils/login-service-singleton.service';
import {GlobalMessages} from '../commons/globalMessages';

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
   globalMessage : GlobalMessages = new GlobalMessages();

  @ViewChild("dangerAlert",{ static: false}) alertDanger: ElementRef;


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
            this.globalMessage.messageType = authResponse.globalMessage.messageType;
            this.globalMessage.message = authResponse.globalMessage.message;
          }else {
            LoginHelper.isLoggedIn = true;
            this.router.navigate(['categories']);
          }
        },error => {

          if (error instanceof HttpErrorResponse) {
            this.globalMessage.message=error.error.globalMessage.message;
            return;
          }
          this.globalMessage.message = "Bilinmeyen bir hata oluştu. Daha sonra tekrar deneyin.";
        });
    }
  }
}
