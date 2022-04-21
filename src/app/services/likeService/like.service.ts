import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AlertifyService} from '../alertifyService/alertify.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material';
import {Observable, throwError} from 'rxjs';
import {CategoryDto} from '../../domain/CategoryDto';
import {EndPoints} from '../../commons/endPoints';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) {

  }

    likeExperience(experienceId: number): Observable<boolean> {
    return this.http.get<any>(EndPoints.root + '/operations/like?experienceId=' + experienceId).pipe(catchError(this.handleError));
  }

  unlikeExperience(experienceId: number) {
    return this.http.get<any>(EndPoints.root + '/operations/unlike?experienceId=' + experienceId).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error occured ' + err.error.message;
    } else {
      errorMessage = 'A systematical error occured ' + err.error.message;
    }
    return throwError(errorMessage);
  }


}
