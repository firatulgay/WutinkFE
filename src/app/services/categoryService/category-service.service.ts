import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthDto} from '../../domain/AuthDto';
import {EndPoints} from '../../commons/endPoints';
import {catchError, tap} from 'rxjs/operators';
import {CategoryDto} from '../../domain/CategoryDto';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getMainCategories():Observable<CategoryDto[]>{
   return  this.http.get<CategoryDto[]>( EndPoints.root +"/getCategories")
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
