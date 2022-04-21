import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CategoryDto} from '../../domain/CategoryDto';
import {ExperienceDto} from '../../domain/ExperienceDto';
import {EndPoints} from '../../commons/endPoints';
import {catchError, tap} from 'rxjs/operators';
import {AuthDto} from '../../domain/AuthDto';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http: HttpClient) { }

  getAllExperiencesByCategoryId(categoryId : number):Observable<ExperienceDto[]>{
    return  this.http.get<ExperienceDto[]>( EndPoints.root +"/getAllExperienceByCategoryId/"+categoryId)
      .pipe(catchError(this.handleError));
  }

  getExperienceById(experienceId : number):Observable<ExperienceDto>{
    return  this.http.get<ExperienceDto>( EndPoints.root +"/getExperienceById/"+experienceId)
      .pipe(catchError(this.handleError));
  }

  saveExperience(experienceDto:ExperienceDto):Observable<ExperienceDto>{
    return this.http.post<ExperienceDto>(EndPoints.root + '/saveExperience', experienceDto, {withCredentials: true})
      .pipe(tap((expResponse) => console.log(JSON.stringify(expResponse))), catchError(this.setError));
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

  setError(error) {
    console.log(error);
    return throwError(error);
  }

}
