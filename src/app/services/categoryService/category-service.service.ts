import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthDto} from '../../domain/AuthDto';
import {EndPoints} from '../../commons/endPoints';
import {catchError, tap} from 'rxjs/operators';
import {CategoryDto} from '../../domain/CategoryDto';
import {Observable, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {WutinkCookieService} from '../cookieService/wutink-cookie.service';
import {CategoryDropdownDto} from '../../domain/CategoryDropdownDto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getMainCategories():Observable<CategoryDto[]>{
    console.log( this.cookieService.get('jwtSessionId'));
   return  this.http.get<CategoryDto[]>( EndPoints.root +"/getCategories")
                    .pipe(catchError(this.handleError));
  }

  getCategoriesForDropdown():Observable<CategoryDropdownDto[]>{
    console.log( this.cookieService.get('jwtSessionId'));
    return  this.http.get<CategoryDropdownDto[]>( EndPoints.root +"/getCategoriesForDropdown")
      .pipe(catchError(this.handleError));
  }

private handleError(err: HttpErrorResponse){

  let errorMessage = ''

  if(err.error instanceof ErrorEvent){
    errorMessage = "An error occured " + err.error.message
  }else{
    errorMessage = "A systematical error occured " + err.error.message
  }
  return throwError(errorMessage) ;
}
}
