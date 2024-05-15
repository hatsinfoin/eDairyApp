import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SchoolLibrary } from 'src/app/dataDTO/schooleLibrary.data'; 
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolLibraryService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllApiURL = "http://"+this.ipAddress+"/v1/SchooleLibrary/getAllSchooleLibrarys";
  saveApiURL =  "http://"+this.ipAddress+"/v1/SchooleLibrary/saveSchooleLibrary";
  deleteApiURL =  "http://"+this.ipAddress+"/v1/SchooleLibrary/deleteSchooleLibrary";
  libByBranchStdApiURL =  "http://"+this.ipAddress+"/v1/SchooleLibrary/getLibDetlsByBranchStd";
  editApiURL =  "http://"+this.ipAddress+"/v1/SchooleLibrary/editsaveSchooleLibrary";
  
  constructor(private apiService: ApiService,private http: HttpClient,private appProp: AppPropertiesService) { 
    this.ipAddress = appProp.getHostName;

  }

  
  getLibDetlsByBranchStd(branchId:String,standardId:String): Observable<SchoolLibrary[]> {
    console.log(this.libByBranchStdApiURL+"/"+branchId+"/"+standardId);
     return this.http.get<SchoolLibrary[]>(this.libByBranchStdApiURL+"/"+branchId+"/"+standardId)
      .pipe(
        tap(_ => console.log(`fetched All School Events Successfuly: `)),
        catchError(this.handleError<SchoolLibrary[]>(`Error while getting getSchoolEvents`))
      );
  }

  getSchoolLibrary(): Observable<SchoolLibrary[]> {
    return this.http.get<SchoolLibrary[]>(this.getAllApiURL)
     .pipe(
       tap(_ => console.log(`fetched All School Events Successfuly: `)),
       catchError(this.handleError<SchoolLibrary[]>(`Error while getting getSchoolEvents`))
     );
 }

  saveSchoolLibrary(saveSchoolEvent:SchoolLibrary): Observable<SchoolLibrary[]> {
    console.log("calling saveSchoolEvent ");
    console.log(this.saveApiURL);
    console.log(saveSchoolEvent);
    return this.http.post<SchoolLibrary[]>(this.saveApiURL,saveSchoolEvent)
     .pipe(
       tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
       catchError(this.handleError<SchoolLibrary[]>(`Error while saving saveSchoolEvents`))
     );
 }

 editSchoolLibrary(saveSchoolEvent:SchoolLibrary): Observable<SchoolLibrary[]> {
  console.log("calling saveSchoolEvent ");
  console.log(this.saveApiURL);
  console.log(saveSchoolEvent);
  return this.http.put<SchoolLibrary[]>(this.saveApiURL,saveSchoolEvent)
   .pipe(
     tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
     catchError(this.handleError<SchoolLibrary[]>(`Error while saving saveSchoolEvents`))
   );
}



 deleteSchoolLibrary(deleteEventID:string): Observable<SchoolLibrary[]> {
  console.log("calling deleteSchoolEvents ");
  console.log(this.deleteApiURL+"/"+deleteEventID);
  console.log(deleteEventID);
  return this.http.delete<SchoolLibrary[]>(this.deleteApiURL+"/"+deleteEventID)
   .pipe(
     tap(_ => console.log(`deleteSchoolEvents  Successlfy: `)),
     catchError(this.handleError<SchoolLibrary[]>(`Error while saving saveSchoolEvents`))
   );
}
 
  //saveEvent

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
     // alert(error);
      //alert(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  


}
