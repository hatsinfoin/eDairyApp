import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { UserLogin } from 'src/app/dataDTO/UserLogin.data'; // Import UserLogin DTO
import { ApiService } from '../services/api.service'; // Assuming ApiService for any other shared functions
import { AppPropertiesService } from '../services/app-properties.service';
import { UserRegistration } from 'src/app/dataDTO/UserRegistration.data'; // Assuming a UserRegistration DTO
import { LoadingComponent } from '../loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  loginApiURL = this.ipAddress + "/v1/userLogin/login";
  resetPasswordApiURL = this.ipAddress + "/v1/userLogin/resetPassword";

  constructor(private apiService: ApiService,
    private loadingComponent: LoadingComponent,
    private http: HttpClient, private appProp: AppPropertiesService) {
    this.ipAddress = appProp.getHostName;
  }

  // Method to validate user login
  validateUserLogin(userLogin: UserLogin): Observable<UserRegistration | string> {
    console.log("Validating user login...");
    this.loadingComponent.presentLoading('Logging in...'); // Show loading spinner with message

    return this.http.post<UserRegistration | string>(this.loginApiURL, userLogin)
      .pipe(
        tap((response) => {
          if (response instanceof UserRegistration) {
            console.log('Login successful, UserRegistration object:', response);
          } else {
            console.log('Login failed, response:', response);
          }
        }),
        finalize(() => {
          this.loadingComponent.dismissLoading(); // Hide loading after request completes
        }),
        catchError(this.handleError<UserRegistration | string>('Error while validating user login'))
      );
  }

  // Method to reset user password
  resetPassword(userLogin: UserLogin): Observable<boolean> {
    console.log("Resetting password for user:", userLogin.username);
    return this.http.put<boolean>(this.resetPasswordApiURL, userLogin, this.httpHeader)
      .pipe(
        tap(_ => console.log(`Password reset attempted for username: ${userLogin.username}`)),
        catchError(this.handleError<boolean>('Error while resetting password'))
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
