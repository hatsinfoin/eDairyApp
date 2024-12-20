import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { SchoolLibrary } from 'src/app/dataDTO/schooleLibrary.data';
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';
import { LoadingComponent } from '../loading/loading.component'; // Import LoadingComponent

@Injectable({
  providedIn: 'root'
})
export class SchoolLibraryService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllApiURL = this.ipAddress + "/v1/SchooleLibrary/getAllSchooleLibrarys";
  saveApiURL = this.ipAddress + "/v1/SchooleLibrary/saveSchooleLibrary";
  deleteApiURL = this.ipAddress + "/v1/SchooleLibrary/deleteSchooleLibrary";
  libByBranchStdApiURL = this.ipAddress + "/v1/SchooleLibrary/getLibDetlsByBranchStd";
  editApiURL = this.ipAddress + "/v1/SchooleLibrary/editsaveSchooleLibrary";

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private appProp: AppPropertiesService,
    private loadingComponent: LoadingComponent // Injecting LoadingComponent
  ) {
    this.ipAddress = appProp.getHostName;
  }

  getLibDetlsByBranchStd(branchId: String, standardId: String): Observable<SchoolLibrary[]> {
    console.log(this.libByBranchStdApiURL + "/" + branchId + "/" + standardId);
    this.loadingComponent.presentLoading('Fetching library details...');
    return this.http.get<SchoolLibrary[]>(this.libByBranchStdApiURL + "/" + branchId + "/" + standardId)
      .pipe(
        tap(_ => console.log(`Fetched library details successfully.`)),
        catchError(this.handleError<SchoolLibrary[]>(`Error while getting library details`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  getSchoolLibrary(): Observable<SchoolLibrary[]> {
    this.loadingComponent.presentLoading('Fetching school libraries...');
    return this.http.get<SchoolLibrary[]>(this.getAllApiURL)
      .pipe(
        tap(_ => console.log(`Fetched all school libraries successfully.`)),
        catchError(this.handleError<SchoolLibrary[]>(`Error while getting school libraries`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  saveSchoolLibrary(saveSchoolEvent: SchoolLibrary): Observable<SchoolLibrary[]> {
    console.log("calling saveSchoolEvent ");
    console.log(this.saveApiURL);
    console.log(saveSchoolEvent);
    this.loadingComponent.presentLoading('Saving school library...');
    return this.http.post<SchoolLibrary[]>(this.saveApiURL, saveSchoolEvent)
      .pipe(
        tap(_ => console.log(`School library saved successfully.`)),
        catchError(this.handleError<SchoolLibrary[]>(`Error while saving school library`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  editSchoolLibrary(saveSchoolEvent: SchoolLibrary): Observable<SchoolLibrary[]> {
    console.log("calling editSchoolEvent ");
    console.log(this.editApiURL);
    console.log(saveSchoolEvent);
    this.loadingComponent.presentLoading('Editing school library...');
    return this.http.put<SchoolLibrary[]>(this.editApiURL, saveSchoolEvent)
      .pipe(
        tap(_ => console.log(`School library edited successfully.`)),
        catchError(this.handleError<SchoolLibrary[]>(`Error while editing school library`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
      );
  }

  deleteSchoolLibrary(deleteEventID: string): Observable<SchoolLibrary[]> {
    console.log("calling deleteSchoolLibrary ");
    console.log(this.deleteApiURL + "/" + deleteEventID);
    console.log(deleteEventID);
    this.loadingComponent.presentLoading('Deleting school library...');
    return this.http.delete<SchoolLibrary[]>(this.deleteApiURL + "/" + deleteEventID)
      .pipe(
        tap(_ => console.log(`School library deleted successfully.`)),
        catchError(this.handleError<SchoolLibrary[]>(`Error while deleting school library`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading spinner
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
