import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SchoolHolidays} from 'src/app/dataDTO/schoolHolidays.data'; 
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllSchoolHolidaysApiURL = this.ipAddress+"/v1/holidayLists/getAllHollidays";
  saveSchoolHolidaysURL =  this.ipAddress+"/v1/holidayLists/saveHolidaysList";
  deleteSchoolHolidaysApiURL =  this.ipAddress+"/v1/holidayLists/deleteHoliday";
  editSchoolHolidaysApiURL =  this.ipAddress+"/v1/holidayLists/editHoliday";
  
  constructor(private apiService: ApiService,private http: HttpClient,private appProp: AppPropertiesService) {

    this.ipAddress = appProp.getHostName;

   }


  getSchoolHolidayList(): Observable<SchoolHolidays[]> {
     return this.http.get<SchoolHolidays[]>(this.getAllSchoolHolidaysApiURL)
      .pipe(
        tap(_ => console.log(`fetched All School Events Successfuly: `)),
        catchError(this.handleError<SchoolHolidays[]>(`Error while getting getSchoolEvents`))
      );
  }


  saveSchoolHolidays(saveSchoolHolidays:SchoolHolidays): Observable<SchoolHolidays[]> {
    console.log("calling saveSchoolEvent ");
    console.log(this.saveSchoolHolidaysURL);
    console.log(saveSchoolHolidays);
    return this.http.post<SchoolHolidays[]>(this.saveSchoolHolidaysURL,saveSchoolHolidays)
     .pipe(
       tap(_ => console.log(`SchoolHolidays Saved Successlfy: `)),
       catchError(this.handleError<SchoolHolidays[]>(`Error while saving saveSchoolEvents`))
     );
 }

 editSchoolHolidays(saveSchoolHolidays:SchoolHolidays): Observable<SchoolHolidays[]> {
  console.log("calling saveSchoolEvent ");
  console.log(this.editSchoolHolidaysApiURL);
  console.log(saveSchoolHolidays);
  return this.http.put<SchoolHolidays[]>(this.editSchoolHolidaysApiURL,saveSchoolHolidays)
   .pipe(
     tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
     catchError(this.handleError<SchoolHolidays[]>(`Error while saving saveSchoolEvents`))
   );
}



 deleteSchoolHolidays(deleteSchoolHolidayID:string): Observable<SchoolHolidays[]> {
  console.log("calling deleteSchoolEvents ");
  console.log(this.deleteSchoolHolidaysApiURL+"/"+deleteSchoolHolidayID);
  console.log(deleteSchoolHolidayID);
  return this.http.delete<SchoolHolidays[]>(this.deleteSchoolHolidaysApiURL+"/"+deleteSchoolHolidayID)
   .pipe(
     tap(_ => console.log(`SchoolHolidays Deleted  Successlfy: `)),
     catchError(this.handleError<SchoolHolidays[]>(`Error while saving SchoolHolidays`))
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
