import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AcademicCalendar } from 'src/app/dataDTO/schoolAcademicCalendars.data'; 
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';

@Injectable({
  providedIn: 'root'
})
export class AcademicCalendarService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;

  getAllAcademicCalendarApiURL = "http://"+this.ipAddress+"/v1/AcademicCalendar/getAllAcademicCalendars";
  saveEventApiURL =  "http://"+this.ipAddress+"/v1/AcademicCalendar/saveAcademicCalendar";
  deleteEventApiURL =  "http://"+this.ipAddress+"/v1/AcademicCalendar/deleteAcademicCalendar";
  editEventApiURL =  "http://"+this.ipAddress+"/v1/AcademicCalendar/saveAcademicCalendar";
  
  constructor(private apiService: ApiService,private http: HttpClient,private appProp: AppPropertiesService) { 

  }


  getAcademicCalendar(): Observable<AcademicCalendar[]> { 
      return this.http.get<AcademicCalendar[]>(this.getAllAcademicCalendarApiURL)
      .pipe(
        tap(_ => console.log(`fetched All School AcademicCalendar Successfuly: `)),
        catchError(this.handleError<AcademicCalendar[]>(`Error while getting getAcademicCalendar`))
      );
  }


  saveAcademicCalendar(saveSchoolEvent:AcademicCalendar): Observable<AcademicCalendar[]> {
    console.log("calling saveSchoolEvent ");
    console.log(this.saveEventApiURL);
    console.log(saveSchoolEvent);
    return this.http.post<AcademicCalendar[]>(this.saveEventApiURL,saveSchoolEvent)
     .pipe(
       tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
       catchError(this.handleError<AcademicCalendar[]>(`Error while saving saveAcademicCalendar`))
     );
 }

 editAcademicCalendar(saveSchoolEvent:AcademicCalendar): Observable<AcademicCalendar[]> {
  console.log("calling saveSchoolEvent ");
  console.log(this.saveEventApiURL);
  console.log(saveSchoolEvent);
  return this.http.put<AcademicCalendar[]>(this.saveEventApiURL,saveSchoolEvent)
   .pipe(
     tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
     catchError(this.handleError<AcademicCalendar[]>(`Error while saving saveAcademicCalendar`))
   );
}



 deleteAcademicCalendar(deleteEventID:string): Observable<AcademicCalendar[]> {
  console.log("calling deleteAcademicCalendar ");
  console.log(this.deleteEventApiURL+"/"+deleteEventID);
  console.log(deleteEventID);
  return this.http.delete<AcademicCalendar[]>(this.deleteEventApiURL+"/"+deleteEventID)
   .pipe(
     tap(_ => console.log(`deleteAcademicCalendar  Successlfy: `)),
     catchError(this.handleError<AcademicCalendar[]>(`Error while saving saveAcademicCalendar`))
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
