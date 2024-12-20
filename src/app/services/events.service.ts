import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { SchoolEvents } from 'src/app/dataDTO/schoolEvents.data';
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';
import { LoadingComponent } from '../loading/loading.component';  // Import the LoadingComponent

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllEventsApiURL = this.ipAddress + "/v1/events/getAllEvents";
  saveEventApiURL = this.ipAddress + "/v1/events/saveEvent";
  deleteEventApiURL = this.ipAddress + "/v1/events/deleteEvent";
  editEventApiURL = this.ipAddress + "/v1/events/editEvent";

  constructor(private apiService: ApiService,
    private http: HttpClient,
    private appProp: AppPropertiesService,
    private loadingComponent: LoadingComponent) { // Inject LoadingComponent

    this.ipAddress = appProp.getHostName;
  }

  // Get all school events
  getSchoolEvents(): Observable<SchoolEvents[]> {
    this.loadingComponent.presentLoading('Fetching events...');  // Show loading

    return this.http.get<SchoolEvents[]>(this.getAllEventsApiURL, this.httpHeader)
      .pipe(
        tap(_ => console.log(`Fetched all school events successfully`)),
        catchError(this.handleError<SchoolEvents[]>(`Error while fetching school events`)),
        finalize(() => {
          this.loadingComponent.dismissLoading();  // Dismiss loading after the request completes
        })
      );
  }

  // Save a new school event
  saveSchoolEvents(saveSchoolEvent: SchoolEvents): Observable<SchoolEvents[]> {
    console.log("Calling saveSchoolEvent");
    console.log(saveSchoolEvent);
    this.loadingComponent.presentLoading('Saving event...');  // Show loading

    return this.http.post<SchoolEvents[]>(this.saveEventApiURL, saveSchoolEvent, this.httpHeader)
      .pipe(
        tap(_ => console.log('School event saved successfully')),
        catchError(this.handleError<SchoolEvents[]>(`Error while saving event`)),
        finalize(() => {
          this.loadingComponent.dismissLoading();  // Dismiss loading after the request completes
        })
      );
  }

  // Edit an existing school event
  editSchoolEvents(saveSchoolEvent: SchoolEvents): Observable<SchoolEvents[]> {
    console.log("Calling editSchoolEvent");
    console.log(saveSchoolEvent);
    this.loadingComponent.presentLoading('Updating event...');  // Show loading

    return this.http.put<SchoolEvents[]>(this.editEventApiURL, saveSchoolEvent, this.httpHeader)
      .pipe(
        tap(_ => console.log('School event updated successfully')),
        catchError(this.handleError<SchoolEvents[]>(`Error while updating event`)),
        finalize(() => {
          this.loadingComponent.dismissLoading();  // Dismiss loading after the request completes
        })
      );
  }

  // Delete a school event
  deleteSchoolEvents(deleteEventID: string): Observable<SchoolEvents[]> {
    console.log("Calling deleteSchoolEvent");
    console.log(deleteEventID);
    this.loadingComponent.presentLoading('Deleting event...');  // Show loading

    return this.http.delete<SchoolEvents[]>(`${this.deleteEventApiURL}/${deleteEventID}`, this.httpHeader)
      .pipe(
        tap(_ => console.log('School event deleted successfully')),
        catchError(this.handleError<SchoolEvents[]>(`Error while deleting event`)),
        finalize(() => {
          this.loadingComponent.dismissLoading();  // Dismiss loading after the request completes
        })
      );
  }

  // Error handling method
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
