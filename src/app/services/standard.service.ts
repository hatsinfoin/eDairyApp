import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SchoolStandard } from 'src/app/dataDTO/schoolStandard.data';
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
  getAllSchoolStdApiURL = "http://" + this.ipAddress + "/v1/standard/findAllStandards";
  saveSchoolStdApiURL = "http://" + this.ipAddress + "/v1/standard/saveStandard";
  deleteSchoolStdApiURL = "http://" + this.ipAddress + "/v1/standard/deleteStandard";
  editSchoolStdApiURL = "http://" + this.ipAddress + "/v1/standard/saveStandard";

  constructor(private apiService: ApiService, private http: HttpClient,private appProp: AppPropertiesService) { 
    this.ipAddress = appProp.getHostName;
  }


  getSchoolStandard(): Observable<SchoolStandard[]> {
    return this.http.get<SchoolStandard[]>(this.getAllSchoolStdApiURL)
      .pipe(
        tap(_ => console.log(`fetched All School SchoolStd Successfuly: `)),
        catchError(this.handleError<SchoolStandard[]>(`Error while getting getSchoolStandard`))
      );
  }


  saveSchoolStandard(saveSchoolSchoolStd: SchoolStandard): Observable<SchoolStandard[]> {
    console.log("calling saveSchoolSchoolStd ");
    console.log(this.saveSchoolStdApiURL);
    console.log(saveSchoolSchoolStd);
    return this.http.post<SchoolStandard[]>(this.saveSchoolStdApiURL, saveSchoolSchoolStd)
      .pipe(
        tap(_ => console.log(`saveSchoolSchoolStd Saved Successlfy: `)),
        catchError(this.handleError<SchoolStandard[]>(`Error while saving saveSchoolStandard`))
      );
  }

  editSchoolStandard(saveSchoolSchoolStd: SchoolStandard): Observable<SchoolStandard[]> {
    console.log("calling saveSchoolSchoolStd ");
    console.log(this.saveSchoolStdApiURL);
    console.log(saveSchoolSchoolStd);
    return this.http.put<SchoolStandard[]>(this.saveSchoolStdApiURL, saveSchoolSchoolStd)
      .pipe(
        tap(_ => console.log(`saveSchoolSchoolStd Saved Successlfy: `)),
        catchError(this.handleError<SchoolStandard[]>(`Error while saving saveSchoolStandard`))
      );
  }



  deleteSchoolStandard(deleteSchoolStdID: string): Observable<SchoolStandard[]> {
    console.log("calling deleteSchoolStandard ");
    console.log(this.deleteSchoolStdApiURL + "/" + deleteSchoolStdID);
    console.log(deleteSchoolStdID);
    return this.http.delete<SchoolStandard[]>(this.deleteSchoolStdApiURL + "/" + deleteSchoolStdID)
      .pipe(
        tap(_ => console.log(`deleteSchoolStandard  Successlfy: `)),
        catchError(this.handleError<SchoolStandard[]>(`Error while saving saveSchoolStandard`))
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
