import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SchoolTimetable } from 'src/app/dataDTO/schoolTimetable.data';
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  ipAddress = this.appProp.getHostName;
  getAllSchoolTimetableApiURL =  this.ipAddress + "/v1/timetable/getAllTimetable";
  saveSchoolTimetableURL =  this.ipAddress + "/v1/timetable/saveTimetable";
  deleteSchoolTimetableApiURL =  this.ipAddress + "/v1/timetable/deleteTimetable";
  editSchoolTimetableApiURL =  this.ipAddress + "/v1/timetable/saveTimetable";

  constructor(private apiService: ApiService, private http: HttpClient,private appProp: AppPropertiesService) { 
    this.ipAddress = appProp.getHostName;
  }
 
  getAllSchoolTimetables(): Observable<SchoolTimetable[]> {
    return this.http.get<SchoolTimetable[]>(this.getAllSchoolTimetableApiURL)
      .pipe(
        tap(_ => console.log(`fetched All School Timetable Successfuly: `)),
        catchError(this.handleError<SchoolTimetable[]>(`Error while getting getSchoolEvents`))
      );
  }


  saveSchoolTimetable(saveSchoolTimetable: SchoolTimetable): Observable<SchoolTimetable[]> {
    console.log("calling saveSchoolEvent ");
    console.log(this.saveSchoolTimetableURL);
    console.log(saveSchoolTimetable);
    return this.http.post<SchoolTimetable[]>(this.saveSchoolTimetableURL, saveSchoolTimetable)
      .pipe(
        tap(_ => console.log(`saveSchoolTimetable Saved Successlfy: `)),
        catchError(this.handleError<SchoolTimetable[]>(`Error while saving saveSchoolEvents`))
      );
  }

  editSchoolTimetable(saveSchoolTimetable: SchoolTimetable): Observable<SchoolTimetable[]> {
    console.log("calling saveSchoolEvent ");
    console.log(this.saveSchoolTimetableURL);
    console.log(saveSchoolTimetable);
    return this.http.put<SchoolTimetable[]>(this.saveSchoolTimetableURL, saveSchoolTimetable)
      .pipe(
        tap(_ => console.log(`saveSchoolTimetable Saved Successlfy: `)),
        catchError(this.handleError<SchoolTimetable[]>(`Error while saving saveSchoolEvents`))
      );
  }



  deleteSchoolTimetable(deleteSchoolTimetableID: string): Observable<SchoolTimetable[]> {
    console.log("calling deleteSchoolEvents ");
    console.log(this.deleteSchoolTimetableApiURL + "/" + deleteSchoolTimetableID);
    console.log(deleteSchoolTimetableID);
    return this.http.delete<SchoolTimetable[]>(this.deleteSchoolTimetableApiURL + "/" + deleteSchoolTimetableID)
      .pipe(
        tap(_ => console.log(`SchoolTimetable Deleted  Successlfy: `)),
        catchError(this.handleError<SchoolTimetable[]>(`Error while saving SchoolTimetable`))
      );
  }

  //saveEvent

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }



}
