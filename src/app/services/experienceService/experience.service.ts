import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CategoryDto} from '../../domain/CategoryDto';
import {ExperienceDto} from '../../domain/ExperienceDto';
import {EndPoints} from '../../commons/endPoints';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http: HttpClient) { }

  getAllExperiencesByCategoryId(categoryId : number):Observable<ExperienceDto[]>{
    return  this.http.get<ExperienceDto[]>( EndPoints.root +"/getAllExperienceByCategoryId/"+categoryId)
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
