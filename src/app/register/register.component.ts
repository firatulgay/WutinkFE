import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDto} from '../domain/UserDto';
import {LoginService} from '../services/loginService/login.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AlertifyService} from '../services/alertifyService/alertify.service';
import {HttpErrorResponse} from '@angular/common/http';
import {GlobalMessages} from '../commons/globalMessages';
import {MessageType} from '../commons/messageType';
import {LoginHelper} from '../utils/login-service-singleton.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router:Router,
              private alertifyService: AlertifyService,
              private matDialog: MatDialog) { }

  private registerForm: FormGroup;
  private user: UserDto = new UserDto();
  globalMessage : GlobalMessages = new GlobalMessages();

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
        this.user = Object.assign({}, this.registerForm.value);
        this.loginService.register(this.user).subscribe((authResponse) => {

          if (authResponse.success) {
            this.alertifyService.success(authResponse.globalMessage.message);
            localStorage.setItem("isLoggedIn","true");
            this.router.navigate(['home']);
            this.matDialog.closeAll();

          } else {
            this.globalMessage.message = authResponse.globalMessage.message;
            this.globalMessage.messageType = authResponse.globalMessage.messageType;
          }
        },error => {
          this.globalMessage.messageType =  MessageType.ERROR_MESSAGE;
          this.globalMessage.message = "Kayıt sırasında bilinmeyen bir hata oluştu. Daha sonra tekrar deneyin";
        });

        console.log(this.globalMessage);
    }
  }
}
