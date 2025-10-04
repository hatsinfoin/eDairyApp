import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { SchooleDairy } from 'src/app/dataDTO/schooleDairy.data';
import { ApiService } from './api.service';
import { AppPropertiesService } from './app-properties.service';
import { LoadingComponent } from '../loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class EdairyService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllEDairyApiURL = this.ipAddress + '/v1/eDairy/getAllEDairy';
  getEDairyByBranchIdURL = this.ipAddress + '/v1/eDairy/getEDairyByBranchId';
  getEDairyByDateURL = this.ipAddress + '/v1/eDairy/getEDairyByDate';
  saveEDairyURL = this.ipAddress + '/v1/eDairy/saveEDairy';
  deleteEDairyApiURL = this.ipAddress + '/v1/eDairy/deleteEDairy';
  editEDairyApiURL = this.ipAddress + '/v1/eDairy/editEDairy';

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private appProp: AppPropertiesService,
    private loadingComponent: LoadingComponent
  ) {
    this.ipAddress = appProp.getHostName;
  }

  getAllEDairy(): Observable<SchooleDairy[]> {
    this.loadingComponent.presentLoading('Fetching eDairy...');
    return this.http.get<SchooleDairy[]>(this.getAllEDairyApiURL)
      .pipe(
        tap(_ => console.log('Fetched all eDairy entries successfully.')),
        catchError(this.handleError<SchooleDairy[]>('Error while getting eDairy')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  getAllEDairyByBranchId(branchId: string): Observable<SchooleDairy[]> {
    this.loadingComponent.presentLoading('Fetching eDairy by branch...');
    return this.http.get<SchooleDairy[]>(`${this.getEDairyByBranchIdURL}/${branchId}`)
      .pipe(
        tap(_ => console.log('Fetched eDairy by branch successfully.')),
        catchError(this.handleError<SchooleDairy[]>('Error while getting eDairy by branch')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  getEDairyByDate(date: string): Observable<SchooleDairy[]> {
    this.loadingComponent.presentLoading('Fetching eDairy by date...');
    return this.http.get<SchooleDairy[]>(`${this.getEDairyByDateURL}/${date}`)
      .pipe(
        tap(_ => console.log('Fetched eDairy by date successfully.')),
        catchError(this.handleError<SchooleDairy[]>('Error while getting eDairy by date')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  saveEDairy(eDairy: SchooleDairy): Observable<SchooleDairy> {
    this.loadingComponent.presentLoading('Saving eDairy...');
    return this.http.post<SchooleDairy>(this.saveEDairyURL, eDairy, this.httpHeader)
      .pipe(
        tap(_ => console.log('eDairy saved successfully.')),
        catchError(this.handleError<SchooleDairy>('Error while saving eDairy')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  editEDairy(eDairy: SchooleDairy): Observable<SchooleDairy> {
    this.loadingComponent.presentLoading('Editing eDairy...');
    return this.http.put<SchooleDairy>(this.editEDairyApiURL, eDairy, this.httpHeader)
      .pipe(
        tap(_ => console.log('eDairy edited successfully.')),
        catchError(this.handleError<SchooleDairy>('Error while editing eDairy')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  deleteEDairy(eDairyId: string): Observable<any> {
    this.loadingComponent.presentLoading('Deleting eDairy...');
    return this.http.post<any>(`${this.deleteEDairyApiURL}/${eDairyId}`, {}, this.httpHeader)
      .pipe(
        tap(_ => console.log('eDairy deleted successfully.')),
        catchError(this.handleError<any>('Error while deleting eDairy')),
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

