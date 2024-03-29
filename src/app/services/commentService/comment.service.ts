import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {ExperienceDto} from '../../domain/ExperienceDto';
import {EndPoints} from '../../commons/endPoints';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {CommentDto} from '../../domain/commentDto';
import {UserDto} from '../../domain/UserDto';
import {AuthDto} from '../../domain/AuthDto';
import {WutinkCookieService} from '../cookieService/wutink-cookie.service';
import {PageSizeDto} from '../../domain/PageSizeDto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : HttpClient) {  }

  getAllCommentsByExperienceId(experienceId : number,firstIndex :number,offsetSize:number):Observable<CommentDto[]>{
    return  this.http.get<CommentDto[]>( EndPoints.root +"/operations/getCommentsByExperienceId?experienceId="+experienceId +
      "&firstIndexOfPage="+firstIndex +
      "&offsetSize=" +offsetSize)
      .pipe(catchError(this.handleError));
  }

  addComment(comment:CommentDto) : Observable<any>{
    return this.http.post<any>( EndPoints.root +"/operations/doComment",comment)
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
