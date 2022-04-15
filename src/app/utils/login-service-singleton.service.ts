import { Injectable } from '@angular/core';
import {LoginService} from '../services/loginService/login.service';
import {HttpClient} from '@angular/common/http';
import {AlertifyService} from '../services/alertifyService/alertify.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginHelper {

  static isLoggedIn: boolean;

  constructor() { }
}
