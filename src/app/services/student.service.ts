import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SchoolStudentProfile  } from 'src/app/dataDTO/schoolStudentPriofile.data'; 
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllStudentProfileApiURL = "http://"+this.ipAddress+"/v1/students/findAllStudents";
  getStudentProfileByIdApiURL = "http://"+this.ipAddress+"/v1/students/searchByStudentId";
  saveEventApiURL =  "http://"+this.ipAddress+"/v1/students/saveStudent";
  deleteEventApiURL =  "http://"+this.ipAddress+"/v1/students/deleteStudent";
  editEventApiURL =  "http://"+this.ipAddress+"/v1/students/editStudent";
  uploadStudentProfileAPI ="http://"+this.ipAddress+"/v1/students/images/uploadFiles";

  constructor(private apiService: ApiService,private http: HttpClient,private appProp: AppPropertiesService) { 

    this.ipAddress = appProp.getHostName;

  }


  getAllSchoolStudentProfile(): Observable<SchoolStudentProfile[]> {
     return this.http.get<SchoolStudentProfile[]>(this.getAllStudentProfileApiURL)
      .pipe(
        tap(_ => console.log(`fetched All School StudentProfile Successfuly: `)),
        catchError(this.handleError<SchoolStudentProfile[]>(`Error while getting getSchoolStudentProfile`))
      );
  }

  getSchoolStudentProfile(studentId:String): Observable<SchoolStudentProfile[]> {
    return this.http.get<SchoolStudentProfile[]>(this.getStudentProfileByIdApiURL+"/"+studentId)
     .pipe(
       tap(_ => console.log(`fetched All School StudentProfile Successfuly: `)),
       catchError(this.handleError<SchoolStudentProfile[]>(`Error while getting getSchoolStudentProfile`))
     );
 }

  saveSchoolStudentProfile(saveSchoolEvent:SchoolStudentProfile): Observable<SchoolStudentProfile[]> {
    console.log("calling saveSchoolEvent ");
    console.log(this.saveEventApiURL);
    console.log(saveSchoolEvent);
    return this.http.post<SchoolStudentProfile[]>(this.saveEventApiURL,saveSchoolEvent)
     .pipe(
       tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
       catchError(this.handleError<SchoolStudentProfile[]>(`Error while saving saveSchoolStudentProfile`))
     );
 }

 editSchoolStudentProfile(saveSchoolEvent:SchoolStudentProfile): Observable<SchoolStudentProfile[]> {
  console.log("calling saveSchoolEvent ");
  console.log(this.saveEventApiURL);
  console.log(saveSchoolEvent);
  return this.http.put<SchoolStudentProfile[]>(this.saveEventApiURL,saveSchoolEvent)
   .pipe(
     tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
     catchError(this.handleError<SchoolStudentProfile[]>(`Error while saving saveSchoolStudentProfile`))
   );
}



 deleteSchoolStudentProfile(deleteEventID:string): Observable<SchoolStudentProfile[]> {
  console.log("calling deleteSchoolStudentProfile ");
  console.log(this.deleteEventApiURL+"/"+deleteEventID);
  console.log(deleteEventID);
  return this.http.delete<SchoolStudentProfile[]>(this.deleteEventApiURL+"/"+deleteEventID)
   .pipe(
     tap(_ => console.log(`deleteSchoolStudentProfile  Successlfy: `)),
     catchError(this.handleError<SchoolStudentProfile[]>(`Error while saving saveSchoolStudentProfile`))
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

  uploadStudentProfile(files:any): Observable<any[]> {
    console.log("calling uploadStudentProfile ");
    console.log(this.uploadStudentProfileAPI);
    console.log(files);

    const imagesForm = new FormData();
  for (let i = 0; i < files.length; i++) {
    imagesForm.append('files', files[i]);
  }

    return this.http.post<SchoolStudentProfile[]>(this.uploadStudentProfileAPI,imagesForm)
     .pipe(
       tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
       catchError(this.handleError<SchoolStudentProfile[]>(`Error while saving saveSchoolStudentProfile`))
     );
 }
  

}
