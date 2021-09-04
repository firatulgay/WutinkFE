import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {ExperienceDto} from '../../domain/ExperienceDto';
import {EndPoints} from '../../commons/endPoints';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {CommentDto} from '../../domain/commentDto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : HttpClient) {  }

  getAllCommentsByExperienceId(experienceId : number):Observable<CommentDto[]>{
    return  this.http.get<CommentDto[]>( EndPoints.root +"/operations/getCommentsByExperienceId?experienceId="+experienceId)
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
