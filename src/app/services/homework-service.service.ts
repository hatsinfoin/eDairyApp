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
  getHomeworksForSubForDayURL = this.ipAddress + "/v1/homework/getHomeworksForSubForDay";
  getHomeworksDeleteURL = this.ipAddress + "/v1/homework/deleteHomeWork";

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

  deleteHomeWork(homeworkId : string) {

    this.loadingComponent.presentLoading('Deleting homework list...');
    console.log(this.getHomeworksDeleteURL + "/" + homeworkId);
    return this.http.delete<Homework[]>(this.getHomeworksDeleteURL + "/" + homeworkId)
      .pipe(
        tap(_ => console.log(`Fetched all homework successfully.`)),
        catchError(this.handleError<Homework[]>(`Error while getting homework list`)),
        finalize(() => this.loadingComponent.dismissLoading()) // Dismiss loading once done
      );
}

  getHomeworksForSubForDay(dateOfAssignment :string,branchId:string, standardId :string): Observable<Homework[]> {
   // this.loadingComponent.presentLoading('Fetching homework list...');
    console.log(this.getHomeworksForSubForDayURL + "/" + dateOfAssignment + "/" + branchId + "/" + standardId);
    return this.http.get<Homework[]>(this.getHomeworksForSubForDayURL + "/" + dateOfAssignment + "/" + branchId + "/" + standardId)
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

  saveHomework(homework: Homework): Observable<any> {
    this.loadingComponent.presentLoading('Saving homework...');
    return this.http.post(`${this.ipAddress}/v1/homework/saveHomeWork`, homework)
      .pipe(
        tap(_ => console.log('Homework saved successfully.')),
        catchError(this.handleError<any>('Error while saving homework')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }


}
