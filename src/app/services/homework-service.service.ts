import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { Homework } from 'src/app/dataDTO/schookHomework.data';
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';
import { LoadingComponent } from '../loading/loading.component'; // Assuming this is where loadingComponent is declared

@Injectable({
  providedIn: 'root'
})
export class HomeworkServiceService {

  ipAddress = this.appProp.getHostName;
  getAllHomeWorkApiURL = this.ipAddress + "/v1/homework/getAllHomeworks";

  constructor(
    private appProp: AppPropertiesService,
    private apiService: ApiService,
    private http: HttpClient,
    private loadingComponent: LoadingComponent // Injecting loadingComponent
  ) {
    this.ipAddress = appProp.getHostName;
  }

  getHomeworkList(): Observable<Homework[]> {
    this.loadingComponent.presentLoading('Fetching homework list...');
    return this.http.get<Homework[]>(this.getAllHomeWorkApiURL)
      .pipe(
        tap(_ => console.log(`Fetched all homework successfully.`)),
        catchError(this.handleError<Homework[]>(`Error while getting homework list`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading once done
      );
  }

  // Add more methods with similar structure here
  // Example:
  getHomeworkDetails(id: string): Observable<Homework> {
    this.loadingComponent.presentLoading('Fetching homework details...');
    return this.http.get<Homework>(`${this.getAllHomeWorkApiURL}/${id}`)
      .pipe(
        tap(_ => console.log(`Fetched homework details for ID: ${id}`)),
        catchError(this.handleError<Homework>(`Error while getting homework details`)),
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
