import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SchoolExam } from 'src/app/dataDTO/schoolExam.data';
import { ApiService } from './api.service';
import { AppPropertiesService } from '../services/app-properties.service';

@Injectable({
  providedIn: 'root'
})
export class StandardService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  
  getAllSchoolStdApiURL = "http://" + this.ipAddress + "/v1/exams/getAllExams";
  saveSchoolStdApiURL = "http://" + this.ipAddress + "/v1/exams/saveExam";
  deleteSchoolStdApiURL = "http://" + this.ipAddress + "/v1/exams/deleteStandard";
  editSchoolStdApiURL = "http://" + this.ipAddress + "/v1/exams/saveExam";

  constructor(private apiService: ApiService, private http: HttpClient,private appProp: AppPropertiesService) { 

    this.ipAddress = appProp.getHostName;

  }


  getSchoolExam(): Observable<SchoolExam[]> {
    return this.http.get<SchoolExam[]>(this.getAllSchoolStdApiURL)
      .pipe(
        tap(_ => console.log(`fetched All School SchoolStd Successfuly: `)),
        catchError(this.handleError<SchoolExam[]>(`Error while getting getSchoolExam`))
      );
  }


  saveSchoolExam(saveSchoolSchoolStd: SchoolExam): Observable<SchoolExam[]> {
    console.log("calling saveSchoolSchoolStd ");
    console.log(this.saveSchoolStdApiURL);
    console.log(saveSchoolSchoolStd);
    return this.http.post<SchoolExam[]>(this.saveSchoolStdApiURL, saveSchoolSchoolStd)
      .pipe(
        tap(_ => console.log(`saveSchoolSchoolStd Saved Successlfy: `)),
        catchError(this.handleError<SchoolExam[]>(`Error while saving saveSchoolExam`))
      );
  }

  editSchoolExam(saveSchoolSchoolStd: SchoolExam): Observable<SchoolExam[]> {
    console.log("calling saveSchoolSchoolStd ");
    console.log(this.saveSchoolStdApiURL);
    console.log(saveSchoolSchoolStd);
    return this.http.put<SchoolExam[]>(this.saveSchoolStdApiURL, saveSchoolSchoolStd)
      .pipe(
        tap(_ => console.log(`saveSchoolSchoolStd Saved Successlfy: `)),
        catchError(this.handleError<SchoolExam[]>(`Error while saving saveSchoolExam`))
      );
  }



  deleteSchoolExam(deleteSchoolStdID: string): Observable<SchoolExam[]> {
    console.log("calling deleteSchoolExam ");
    console.log(this.deleteSchoolStdApiURL + "/" + deleteSchoolStdID);
    console.log(deleteSchoolStdID);
    return this.http.delete<SchoolExam[]>(this.deleteSchoolStdApiURL + "/" + deleteSchoolStdID)
      .pipe(
        tap(_ => console.log(`deleteSchoolExam  Successlfy: `)),
        catchError(this.handleError<SchoolExam[]>(`Error while saving saveSchoolExam`))
      );
  }

  //saveSchoolStd

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }



}
