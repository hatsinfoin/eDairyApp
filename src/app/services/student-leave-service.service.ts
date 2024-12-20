import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { StudentLeaveData } from '../dataDTO/studentLeave.data'; // Updated import for StudentLeaveData
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';
import { LoadingComponent } from '../loading/loading.component'; // Assuming the LoadingComponent is imported correctly

@Injectable({
  providedIn: 'root'
})
export class StudentLeaveServiceService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllStudentLeaveApiURL = this.ipAddress + "/v1/StudentLeave/getAllStudentLeave"; // Renamed API for student leave
  getStudentLeaveByIdApiURL = this.ipAddress + "/v1/StudentLeave/searchByLeaveId"; // Renamed API for leave by ID
  saveLeaveApiURL = this.ipAddress + "/v1/StudentLeave/saveStudentLeave"; // Renamed API for saving leave
  deleteLeaveApiURL = this.ipAddress + "/v1/StudentLeave/deleteLeave"; // Renamed API for deleting leave
  editLeaveApiURL = this.ipAddress + "/v1/StudentLeave/saveStudentLeave"; // Renamed API for editing leave
  uploadLeaveProfileAPI = this.ipAddress + "/v1/StudentLeave/images/uploadLeaveFiles"; // Renamed API for uploading leave files

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private appProp: AppPropertiesService,
    private loadingComponent: LoadingComponent // Injecting LoadingComponent
  ) {
    this.ipAddress = appProp.getHostName;
  }

  getAllStudentLeave(): Observable<StudentLeaveData[]> {
    this.loadingComponent.presentLoading('Fetching student leave data...');
    return this.http.get<StudentLeaveData[]>(this.getAllStudentLeaveApiURL)
      .pipe(
        tap(_ => console.log(`Fetched all student leave data successfully.`)),
        catchError(this.handleError<StudentLeaveData[]>(`Error while getting student leave data`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  getStudentLeaveById(leaveId: string): Observable<StudentLeaveData[]> {
    this.loadingComponent.presentLoading('Fetching student leave details...');
    return this.http.get<StudentLeaveData[]>(this.getStudentLeaveByIdApiURL + "/" + leaveId)
      .pipe(
        tap(_ => console.log(`Fetched student leave data for ID: ${leaveId}`)),
        catchError(this.handleError<StudentLeaveData[]>(`Error while getting student leave by ID`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  saveStudentLeave(saveLeaveData: StudentLeaveData): Observable<StudentLeaveData[]> {
    console.log("Calling saveStudentLeave");
    console.log(this.saveLeaveApiURL);
    console.log(saveLeaveData);
    this.loadingComponent.presentLoading('Saving student leave data...');
    return this.http.post<StudentLeaveData[]>(this.saveLeaveApiURL, saveLeaveData)
      .pipe(
        tap(_ => console.log(`Student leave data saved successfully.`)),
        catchError(this.handleError<StudentLeaveData[]>(`Error while saving student leave data`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  editStudentLeave(saveLeaveData: StudentLeaveData): Observable<StudentLeaveData[]> {
    console.log("Calling editStudentLeave");
    console.log(this.editLeaveApiURL);
    console.log(saveLeaveData);
    this.loadingComponent.presentLoading('Editing student leave data...');
    return this.http.put<StudentLeaveData[]>(this.editLeaveApiURL, saveLeaveData)
      .pipe(
        tap(_ => console.log(`Student leave data edited successfully.`)),
        catchError(this.handleError<StudentLeaveData[]>(`Error while editing student leave data`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  deleteStudentLeave(deleteEventID: string): Observable<StudentLeaveData[]> {
    console.log("Calling deleteStudentLeave");
    console.log(this.deleteLeaveApiURL + "/" + deleteEventID);
    console.log(deleteEventID);
    this.loadingComponent.presentLoading('Deleting student leave data...');
    return this.http.delete<StudentLeaveData[]>(this.deleteLeaveApiURL + "/" + deleteEventID)
      .pipe(
        tap(_ => console.log(`Student leave data deleted successfully.`)),
        catchError(this.handleError<StudentLeaveData[]>(`Error while deleting student leave data`)),
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

  uploadStudentLeaveProfile(files: any): Observable<any[]> {
    console.log("Calling uploadStudentLeaveProfile");
    console.log(this.uploadLeaveProfileAPI);
    console.log(files);

    const imagesForm = new FormData();
    for (let i = 0; i < files.length; i++) {
      imagesForm.append('files', files[i]);
    }

    this.loadingComponent.presentLoading('Uploading student leave profile...');
    return this.http.post<StudentLeaveData[]>(this.uploadLeaveProfileAPI, imagesForm)
      .pipe(
        tap(_ => console.log(`Student leave profile uploaded successfully.`)),
        catchError(this.handleError<StudentLeaveData[]>(`Error while uploading student leave profile`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }
}
