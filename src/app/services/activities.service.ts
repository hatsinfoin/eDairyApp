import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SchoolActivities } from 'src/app/dataDTO/schoolActivities.data'; 
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllactivitiesApiURL = "http://"+this.ipAddress+"/v1/activities/getAllActivity";
  saveEventApiURL =  "http://"+this.ipAddress+"/v1/activities/saveActivity";
  deleteEventApiURL =  "http://"+this.ipAddress+"/v1/activities/deleteActivity";
  editEventApiURL =  "http://"+this.ipAddress+"/v1/activities/editActivity";
  
  constructor(private apiService: ApiService,private http: HttpClient,private appProp: AppPropertiesService) { 

    this.ipAddress = appProp.getHostName;

  }


  getSchoolActivities(): Observable<SchoolActivities[]> {
     return this.http.get<SchoolActivities[]>(this.getAllactivitiesApiURL)
      .pipe(
        tap(_ => console.log(`fetched All School Activities Successfuly: `)),
        catchError(this.handleError<SchoolActivities[]>(`Error while getting getSchoolActivities`))
      );
  }


  saveSchoolActivities(saveSchoolEvent:SchoolActivities): Observable<SchoolActivities[]> {
    console.log("calling saveSchoolEvent ");
    console.log(this.saveEventApiURL);
    console.log(saveSchoolEvent);
    return this.http.post<SchoolActivities[]>(this.saveEventApiURL,saveSchoolEvent)
     .pipe(
       tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
       catchError(this.handleError<SchoolActivities[]>(`Error while saving saveSchoolActivities`))
     );
 }

 editSchoolActivities(saveSchoolEvent:SchoolActivities): Observable<SchoolActivities[]> {
  console.log("calling saveSchoolEvent ");
  console.log(this.saveEventApiURL);
  console.log(saveSchoolEvent);
  return this.http.put<SchoolActivities[]>(this.saveEventApiURL,saveSchoolEvent)
   .pipe(
     tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
     catchError(this.handleError<SchoolActivities[]>(`Error while saving saveSchoolActivities`))
   );
}



 deleteSchoolActivities(deleteEventID:string): Observable<SchoolActivities[]> {
  console.log("calling deleteSchoolActivities ");
  console.log(this.deleteEventApiURL+"/"+deleteEventID);
  console.log(deleteEventID);
  return this.http.delete<SchoolActivities[]>(this.deleteEventApiURL+"/"+deleteEventID)
   .pipe(
     tap(_ => console.log(`deleteSchoolActivities  Successlfy: `)),
     catchError(this.handleError<SchoolActivities[]>(`Error while saving saveSchoolActivities`))
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
