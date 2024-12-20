import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { SchoolStudentProfile } from 'src/app/dataDTO/schoolStudentPriofile.data';
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';
import { LoadingComponent } from '../loading/loading.component'; // Assuming the LoadingComponent is imported correctly

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllStudentProfileApiURL = this.ipAddress + "/v1/students/findAllStudents";
  getStudentProfileByIdApiURL = this.ipAddress + "/v1/students/searchByStudentId";
  saveEventApiURL = this.ipAddress + "/v1/students/saveStudent";
  deleteEventApiURL = this.ipAddress + "/v1/students/deleteStudent";
  editEventApiURL = this.ipAddress + "/v1/students/editStudent";
  uploadStudentProfileAPI = this.ipAddress + "/v1/students/images/uploadFiles";

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private appProp: AppPropertiesService,
    private loadingComponent: LoadingComponent // Injecting LoadingComponent
  ) {
    this.ipAddress = appProp.getHostName;
  }

  getAllSchoolStudentProfile(): Observable<SchoolStudentProfile[]> {
    this.loadingComponent.presentLoading('Fetching student profiles...');
    return this.http.get<SchoolStudentProfile[]>(this.getAllStudentProfileApiURL)
      .pipe(
        tap(_ => console.log(`Fetched all student profiles successfully.`)),
        catchError(this.handleError<SchoolStudentProfile[]>(`Error while getting student profiles`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  getSchoolStudentProfile(studentId: string): Observable<SchoolStudentProfile[]> {
    this.loadingComponent.presentLoading('Fetching student profile...');
    return this.http.get<SchoolStudentProfile[]>(this.getStudentProfileByIdApiURL + "/" + studentId)
      .pipe(
        tap(_ => console.log(`Fetched student profile for ID: ${studentId}`)),
        catchError(this.handleError<SchoolStudentProfile[]>(`Error while getting student profile by ID`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  saveSchoolStudentProfile(saveSchoolEvent: SchoolStudentProfile): Observable<SchoolStudentProfile[]> {
    console.log("Calling saveSchoolStudentProfile");
    console.log(this.saveEventApiURL);
    console.log(saveSchoolEvent);
    this.loadingComponent.presentLoading('Saving student profile...');
    return this.http.post<SchoolStudentProfile[]>(this.saveEventApiURL, saveSchoolEvent)
      .pipe(
        tap(_ => console.log(`Student profile saved successfully.`)),
        catchError(this.handleError<SchoolStudentProfile[]>(`Error while saving student profile`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  editSchoolStudentProfile(saveSchoolEvent: SchoolStudentProfile): Observable<SchoolStudentProfile[]> {
    console.log("Calling editSchoolStudentProfile");
    console.log(this.editEventApiURL);
    console.log(saveSchoolEvent);
    this.loadingComponent.presentLoading('Editing student profile...');
    return this.http.put<SchoolStudentProfile[]>(this.editEventApiURL, saveSchoolEvent)
      .pipe(
        tap(_ => console.log(`Student profile edited successfully.`)),
        catchError(this.handleError<SchoolStudentProfile[]>(`Error while editing student profile`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  deleteSchoolStudentProfile(deleteEventID: string): Observable<SchoolStudentProfile[]> {
    console.log("Calling deleteSchoolStudentProfile");
    console.log(this.deleteEventApiURL + "/" + deleteEventID);
    console.log(deleteEventID);
    this.loadingComponent.presentLoading('Deleting student profile...');
    return this.http.delete<SchoolStudentProfile[]>(this.deleteEventApiURL + "/" + deleteEventID)
      .pipe(
        tap(_ => console.log(`Student profile deleted successfully.`)),
        catchError(this.handleError<SchoolStudentProfile[]>(`Error while deleting student profile`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  // Save Event
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  uploadStudentProfile(files: any): Observable<any[]> {
    console.log("Calling uploadStudentProfile");
    console.log(this.uploadStudentProfileAPI);
    console.log(files);

    const imagesForm = new FormData();
    for (let i = 0; i < files.length; i++) {
      imagesForm.append('files', files[i]);
    }

    this.loadingComponent.presentLoading('Uploading student profile...');
    return this.http.post<SchoolStudentProfile[]>(this.uploadStudentProfileAPI, imagesForm)
      .pipe(
        tap(_ => console.log(`Student profile uploaded successfully.`)),
        catchError(this.handleError<SchoolStudentProfile[]>(`Error while uploading student profile`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }
}
