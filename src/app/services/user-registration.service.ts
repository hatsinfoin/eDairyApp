import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';  // Assuming ApiService for any other shared functions
import { AppPropertiesService } from '../services/app-properties.service';
import { UserRegistration } from 'src/app/dataDTO/UserRegistration.data'; // Assuming a UserRegistration DTO
import { LoadingComponent } from '../loading/loading.component'; // Assuming LoadingComponent for showing spinner

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  registerApiURL = this.ipAddress + "/v1/userRegistration/registerUser";
  updateApiURL = this.ipAddress + "/v1/userRegistration/updateUser";
  getAllUsersApiURL = this.ipAddress + "/v1/userRegistration/getAllUsers";
  getUserByEmailApiURL = this.ipAddress + "/v1/userRegistration/getUserByEmail";
  getUsersByRoleApiURL = this.ipAddress + "/v1/userRegistration/getUsersByRole";
  deleteUserApiURL = this.ipAddress + "/v1/userRegistration/deleteUser";

  constructor(private apiService: ApiService,
    private loadingComponent: LoadingComponent,
    private http: HttpClient,
    private appProp: AppPropertiesService) {
    this.ipAddress = appProp.getHostName;
  }

  // Register a new user
  registerUser(userRegistration: UserRegistration): Observable<UserRegistration> {
    this.loadingComponent.presentLoading('Registering user...');  // Show loading

    return this.http.post<UserRegistration>(this.registerApiURL, userRegistration, this.httpHeader)
      .pipe(
        tap((response) => console.log('User registered successfully:', response)),
        catchError(this.handleError<UserRegistration>('Error while registering user')),
        finalize(() => {
          this.loadingComponent.dismissLoading(); // Hide loading after request completes
        })
      );
  }

  // Get all users
  getAllUsers(): Observable<UserRegistration[]> {
    this.loadingComponent.presentLoading('Fetching all users...');  // Show loading

    return this.http.get<UserRegistration[]>(this.getAllUsersApiURL, this.httpHeader)
      .pipe(
        tap((response) => console.log('All users:', response)),
        catchError(this.handleError<UserRegistration[]>('Error while fetching all users', [])),
        finalize(() => {
          this.loadingComponent.dismissLoading(); // Hide loading after request completes
        })
      );
  }

  // Get a user by email
  getUserByEmail(email: string): Observable<UserRegistration> {
    this.loadingComponent.presentLoading('Fetching user by email...');  // Show loading

    const url = `${this.getUserByEmailApiURL}/${email}`;
    return this.http.get<UserRegistration>(url, this.httpHeader)
      .pipe(
        tap((response) => console.log('User by email:', response)),
        catchError(this.handleError<UserRegistration>('Error while fetching user by email')),
        finalize(() => {
          this.loadingComponent.dismissLoading(); // Hide loading after request completes
        })
      );
  }

  // Get users by their role (e.g., "ADMIN", "STUDENT")
  getUsersByRole(role: string): Observable<UserRegistration[]> {
    this.loadingComponent.presentLoading(`Fetching users with role: ${role}...`);  // Show loading

    const url = `${this.getUsersByRoleApiURL}/${role}`;
    return this.http.get<UserRegistration[]>(url, this.httpHeader)
      .pipe(
        tap((response) => console.log('Users by role:', response)),
        catchError(this.handleError<UserRegistration[]>('Error while fetching users by role', [])),
        finalize(() => {
          this.loadingComponent.dismissLoading(); // Hide loading after request completes
        })
      );
  }

  // Update an existing user's information
  updateUser(id: string, userRegistration: UserRegistration): Observable<UserRegistration> {
    this.loadingComponent.presentLoading('Updating user...');  // Show loading

    const url = `${this.updateApiURL}/${id}`;
    return this.http.put<UserRegistration>(url, userRegistration, this.httpHeader)
      .pipe(
        tap((response) => console.log('User updated:', response)),
        catchError(this.handleError<UserRegistration>('Error while updating user')),
        finalize(() => {
          this.loadingComponent.dismissLoading(); // Hide loading after request completes
        })
      );
  }

  // Delete a user by ID
  deleteUser(id: string): Observable<string> {
    this.loadingComponent.presentLoading('Deleting user...');  // Show loading

    const url = `${this.deleteUserApiURL}/${id}`;
    return this.http.delete<string>(url, this.httpHeader)
      .pipe(
        tap((response) => console.log('User deleted:', response)),
        catchError(this.handleError<string>('Error while deleting user')),
        finalize(() => {
          this.loadingComponent.dismissLoading(); // Hide loading after request completes
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
