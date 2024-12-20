import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { AcademicCalendar } from 'src/app/dataDTO/schoolAcademicCalendars.data';
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';
import { LoadingComponent } from '../loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class AcademicCalendarService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;

  getAllAcademicCalendarApiURL = this.ipAddress + "/v1/AcademicCalendar/getAllAcademicCalendars";
  saveEventApiURL = this.ipAddress + "/v1/AcademicCalendar/saveAcademicCalendar";
  deleteEventApiURL = this.ipAddress + "/v1/AcademicCalendar/deleteAcademicCalendar";
  editEventApiURL = this.ipAddress + "/v1/AcademicCalendar/saveAcademicCalendar";

  constructor(private apiService: ApiService, private http: HttpClient, private appProp: AppPropertiesService, private loadingComponent: LoadingComponent) { }

  getAcademicCalendar(): Observable<AcademicCalendar[]> {
    this.loadingComponent.presentLoading('Fetching academic calendar...');
    return this.http.get<AcademicCalendar[]>(this.getAllAcademicCalendarApiURL)
      .pipe(
        tap(_ => console.log(`Fetched all academic calendars successfully.`)),
        catchError(this.handleError<AcademicCalendar[]>('Error while getting academic calendar')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  saveAcademicCalendar(saveSchoolEvent: AcademicCalendar): Observable<AcademicCalendar[]> {
    this.loadingComponent.presentLoading('Saving academic calendar...');
    return this.http.post<AcademicCalendar[]>(this.saveEventApiURL, saveSchoolEvent)
      .pipe(
        tap(_ => console.log(`Academic calendar saved successfully.`)),
        catchError(this.handleError<AcademicCalendar[]>('Error while saving academic calendar')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  editAcademicCalendar(saveSchoolEvent: AcademicCalendar): Observable<AcademicCalendar[]> {
    this.loadingComponent.presentLoading('Editing academic calendar...');
    return this.http.put<AcademicCalendar[]>(this.editEventApiURL, saveSchoolEvent)
      .pipe(
        tap(_ => console.log(`Academic calendar edited successfully.`)),
        catchError(this.handleError<AcademicCalendar[]>('Error while editing academic calendar')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  deleteAcademicCalendar(deleteEventID: string): Observable<AcademicCalendar[]> {
    this.loadingComponent.presentLoading('Deleting academic calendar...');
    return this.http.delete<AcademicCalendar[]>(`${this.deleteEventApiURL}/${deleteEventID}`)
      .pipe(
        tap(_ => console.log(`Academic calendar deleted successfully.`)),
        catchError(this.handleError<AcademicCalendar[]>('Error while deleting academic calendar')),
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
