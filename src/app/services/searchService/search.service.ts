import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {EndPoints} from "../../commons/endPoints";
import {catchError} from "rxjs/operators";
import {ExperienceDto} from "../../domain/ExperienceDto";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http?: HttpClient) {
  }

  searchExperience(searchText: string) :Observable<ExperienceDto[]>{
   return  this.http.get<ExperienceDto[]>(EndPoints.root + '/search/' + searchText).pipe(catchError(this.handleError));
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
