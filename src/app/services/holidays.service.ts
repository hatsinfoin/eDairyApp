import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { SchoolHolidays } from 'src/app/dataDTO/schoolHolidays.data';
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';
import { LoadingComponent } from '../loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllSchoolHolidaysApiURL = this.ipAddress + "/v1/holidayLists/getAllHollidays";
  saveSchoolHolidaysURL = this.ipAddress + "/v1/holidayLists/saveHolidaysList";
  deleteSchoolHolidaysApiURL = this.ipAddress + "/v1/holidayLists/deleteHoliday";
  editSchoolHolidaysApiURL = this.ipAddress + "/v1/holidayLists/editHoliday";

  constructor(private apiService: ApiService, private http: HttpClient, private appProp: AppPropertiesService, private loadingComponent: LoadingComponent) {
    this.ipAddress = appProp.getHostName;
  }

  getSchoolHolidayList(): Observable<SchoolHolidays[]> {
    this.loadingComponent.presentLoading('Fetching school holidays...');
    return this.http.get<SchoolHolidays[]>(this.getAllSchoolHolidaysApiURL)
      .pipe(
        tap(_ => console.log(`Fetched all school holidays successfully.`)),
        catchError(this.handleError<SchoolHolidays[]>('Error while getting school holidays')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  saveSchoolHolidays(saveSchoolHolidays: SchoolHolidays): Observable<SchoolHolidays[]> {
    this.loadingComponent.presentLoading('Saving school holidays...');
    console.log("Calling saveSchoolHolidays: ", this.saveSchoolHolidaysURL);
    console.log(saveSchoolHolidays);
    return this.http.post<SchoolHolidays[]>(this.saveSchoolHolidaysURL, saveSchoolHolidays)
      .pipe(
        tap(_ => console.log(`School holidays saved successfully.`)),
        catchError(this.handleError<SchoolHolidays[]>('Error while saving school holidays')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  editSchoolHolidays(saveSchoolHolidays: SchoolHolidays): Observable<SchoolHolidays[]> {
    this.loadingComponent.presentLoading('Editing school holidays...');
    console.log("Calling editSchoolHolidays: ", this.editSchoolHolidaysApiURL);
    console.log(saveSchoolHolidays);
    return this.http.put<SchoolHolidays[]>(this.editSchoolHolidaysApiURL, saveSchoolHolidays)
      .pipe(
        tap(_ => console.log(`School holidays edited successfully.`)),
        catchError(this.handleError<SchoolHolidays[]>('Error while editing school holidays')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  deleteSchoolHolidays(deleteSchoolHolidayID: string): Observable<SchoolHolidays[]> {
    this.loadingComponent.presentLoading('Deleting school holidays...');
    console.log("Calling deleteSchoolHolidays: ", this.deleteSchoolHolidaysApiURL + "/" + deleteSchoolHolidayID);
    return this.http.delete<SchoolHolidays[]>(this.deleteSchoolHolidaysApiURL + "/" + deleteSchoolHolidayID)
      .pipe(
        tap(_ => console.log(`School holidays deleted successfully.`)),
        catchError(this.handleError<SchoolHolidays[]>('Error while deleting school holidays')),
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
