import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPoints } from '../commons/endPoints';
import { AlertifyService } from '../services/alertifyService/alertify.service';
import { LoginService } from '../services/loginService/login.service';
import { UserDto } from '../domain/UserDto';

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
  ) {}

   private loginForm: FormGroup;
   private user: UserDto = new UserDto();

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
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
