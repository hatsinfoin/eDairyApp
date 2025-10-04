import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { SchoolTimetable } from 'src/app/dataDTO/schoolTimetable.data';
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';
import { LoadingComponent } from '../loading/loading.component'; // Import the LoadingComponent


@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllSchoolTimetableApiURL = this.ipAddress + "/v1/timetable/getAllTimetable";
  getAllTimetableByBranchIdStdURL = this.ipAddress + "/v1/timetable/getAllTimetableByBranchIdStd";
  saveSchoolTimetableURL = this.ipAddress + "/v1/timetable/saveTimetable";
  deleteSchoolTimetableApiURL = this.ipAddress + "/v1/timetable/deleteTimetable";
  editSchoolTimetableApiURL = this.ipAddress + "/v1/timetable/saveTimetable";

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private appProp: AppPropertiesService,
    private loadingComponent: LoadingComponent // Inject LoadingComponent here
   
  ) {
    this.ipAddress = appProp.getHostName;
  }

  getAllSchoolTimetables(): Observable<SchoolTimetable[]> {
    this.loadingComponent.presentLoading('Fetching school timetables...');
    return this.http.get<SchoolTimetable[]>(this.getAllSchoolTimetableApiURL)
      .pipe(
        tap(_ => console.log(`Fetched all school timetables successfully.`)),
        catchError(this.handleError<SchoolTimetable[]>(`Error while getting all school timetables`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Ensure loading spinner is dismissed
      );
  }

  getAllSchoolTimetablesByBranchStd(branchId: string, standaredId:string): Observable<SchoolTimetable[]> {
    this.loadingComponent.presentLoading('Fetching school timetables...');
    console.log(this.getAllTimetableByBranchIdStdURL + "/" + branchId + "/" + standaredId);
    return this.http.get<SchoolTimetable[]>(this.getAllTimetableByBranchIdStdURL + "/" + branchId + "/" + standaredId)
      .pipe(
        tap(_ => console.log(`Fetched all school timetables successfully.`)),
        catchError(this.handleError<SchoolTimetable[]>(`Error while getting all school timetables`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Ensure loading spinner is dismissed
      );
  }



  saveSchoolTimetable(saveSchoolTimetable: SchoolTimetable): Observable<SchoolTimetable[]> {
    console.log("Calling saveSchoolTimetable");
    console.log(this.saveSchoolTimetableURL);
    console.log(saveSchoolTimetable);
    this.loadingComponent.presentLoading('Saving school timetable...');
    return this.http.post<SchoolTimetable[]>(this.saveSchoolTimetableURL, saveSchoolTimetable)
      .pipe(
        tap(_ => console.log(`School timetable saved successfully.`)),
        catchError(this.handleError<SchoolTimetable[]>(`Error while saving school timetable`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Ensure loading spinner is dismissed
      );
  }

  editSchoolTimetable(saveSchoolTimetable: SchoolTimetable): Observable<SchoolTimetable[]> {
    console.log("Calling editSchoolTimetable");
    console.log(this.editSchoolTimetableApiURL);
    console.log(saveSchoolTimetable);
    this.loadingComponent.presentLoading('Editing school timetable...');
    return this.http.put<SchoolTimetable[]>(this.editSchoolTimetableApiURL, saveSchoolTimetable)
      .pipe(
        tap(_ => console.log(`School timetable edited successfully.`)),
        catchError(this.handleError<SchoolTimetable[]>(`Error while editing school timetable`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Ensure loading spinner is dismissed
      );
  }

  deleteSchoolTimetable(deleteSchoolTimetableID: string): Observable<SchoolTimetable[]> {
    console.log("Calling deleteSchoolTimetable");
    console.log(this.deleteSchoolTimetableApiURL + "/" + deleteSchoolTimetableID);
    console.log(deleteSchoolTimetableID);
    this.loadingComponent.presentLoading('Deleting school timetable...');
    return this.http.delete<SchoolTimetable[]>(this.deleteSchoolTimetableApiURL + "/" + deleteSchoolTimetableID)
      .pipe(
        tap(_ => console.log(`School timetable deleted successfully.`)),
        catchError(this.handleError<SchoolTimetable[]>(`Error while deleting school timetable`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Ensure loading spinner is dismissed
      );
  }

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
