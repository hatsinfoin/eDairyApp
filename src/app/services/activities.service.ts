import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { SchoolActivities } from 'src/app/dataDTO/schoolActivities.data';
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';
import { LoadingComponent } from '../loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllactivitiesApiURL = this.ipAddress + "/v1/activities/getAllActivity";
  saveEventApiURL = this.ipAddress + "/v1/activities/saveActivity";
  deleteEventApiURL = this.ipAddress + "/v1/activities/deleteActivity";
  editEventApiURL = this.ipAddress + "/v1/activities/editActivity";

  constructor(private apiService: ApiService, private http: HttpClient, private appProp: AppPropertiesService, private loadingComponent: LoadingComponent) {
    this.ipAddress = appProp.getHostName;
  }

  getSchoolActivities(): Observable<SchoolActivities[]> {
    this.loadingComponent.presentLoading('Fetching school activities...');
    return this.http.get<SchoolActivities[]>(this.getAllactivitiesApiURL)
      .pipe(
        tap(_ => console.log(`Fetched all school activities successfully.`)),
        catchError(this.handleError<SchoolActivities[]>('Error while getting school activities')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  saveSchoolActivities(saveSchoolEvent: SchoolActivities): Observable<SchoolActivities[]> {
    this.loadingComponent.presentLoading('Saving school activities...');
    return this.http.post<SchoolActivities[]>(this.saveEventApiURL, saveSchoolEvent)
      .pipe(
        tap(_ => console.log(`School activities saved successfully.`)),
        catchError(this.handleError<SchoolActivities[]>('Error while saving school activities')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  editSchoolActivities(saveSchoolEvent: SchoolActivities): Observable<SchoolActivities[]> {
    this.loadingComponent.presentLoading('Editing school activities...');
    return this.http.put<SchoolActivities[]>(this.editEventApiURL, saveSchoolEvent)
      .pipe(
        tap(_ => console.log(`School activities edited successfully.`)),
        catchError(this.handleError<SchoolActivities[]>('Error while editing school activities')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  deleteSchoolActivities(deleteEventID: string): Observable<SchoolActivities[]> {
    this.loadingComponent.presentLoading('Deleting school activities...');
    return this.http.delete<SchoolActivities[]>(`${this.deleteEventApiURL}/${deleteEventID}`)
      .pipe(
        tap(_ => console.log(`School activities deleted successfully.`)),
        catchError(this.handleError<SchoolActivities[]>('Error while deleting school activities')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
