import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SchoolEvents } from 'src/app/dataDTO/schoolEvents.data'; 
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllEventsApiURL = "http://"+this.ipAddress+"/v1/events/getAllEvents";
  saveEventApiURL =  "http://"+this.ipAddress+"/v1/events/saveEvent";
  deleteEventApiURL =  "http://"+this.ipAddress+"/v1/events/deleteEvent";
  editEventApiURL =  "http://"+this.ipAddress+"/v1/events/editEvent";
  
  constructor(private apiService: ApiService,private http: HttpClient,private appProp: AppPropertiesService) { 

    this.ipAddress = appProp.getHostName;

  }


  getSchoolEvents(): Observable<SchoolEvents[]> {
     return this.http.get<SchoolEvents[]>(this.getAllEventsApiURL)
      .pipe(
        tap(_ => console.log(`fetched All School Events Successfuly: `)),
        catchError(this.handleError<SchoolEvents[]>(`Error while getting getSchoolEvents`))
      );
  }


  saveSchoolEvents(saveSchoolEvent:SchoolEvents): Observable<SchoolEvents[]> {
    console.log("calling saveSchoolEvent ");
    console.log(this.saveEventApiURL);
    console.log(saveSchoolEvent);
    return this.http.post<SchoolEvents[]>(this.saveEventApiURL,saveSchoolEvent)
     .pipe(
       tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
       catchError(this.handleError<SchoolEvents[]>(`Error while saving saveSchoolEvents`))
     );
 }

 editSchoolEvents(saveSchoolEvent:SchoolEvents): Observable<SchoolEvents[]> {
  console.log("calling saveSchoolEvent ");
  console.log(this.saveEventApiURL);
  console.log(saveSchoolEvent);
  return this.http.put<SchoolEvents[]>(this.saveEventApiURL,saveSchoolEvent)
   .pipe(
     tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
     catchError(this.handleError<SchoolEvents[]>(`Error while saving saveSchoolEvents`))
   );
}



 deleteSchoolEvents(deleteEventID:string): Observable<SchoolEvents[]> {
  console.log("calling deleteSchoolEvents ");
  console.log(this.deleteEventApiURL+"/"+deleteEventID);
  console.log(deleteEventID);
  return this.http.delete<SchoolEvents[]>(this.deleteEventApiURL+"/"+deleteEventID)
   .pipe(
     tap(_ => console.log(`deleteSchoolEvents  Successlfy: `)),
     catchError(this.handleError<SchoolEvents[]>(`Error while saving saveSchoolEvents`))
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
