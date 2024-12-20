import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { SchoolExam } from 'src/app/dataDTO/schoolExam.data';
import { ApiService } from './api.service';
import { AppPropertiesService } from '../services/app-properties.service';
import { Exams } from 'src/app/dataDTO/ExamResultsModel.data';
import { LoadingComponent } from '../loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;

  getAllSchoolStdApiURL = this.ipAddress + "/v1/exams/getAllExams";
  saveSchoolStdApiURL = this.ipAddress + "/v1/exams/saveExam";
  deleteSchoolStdApiURL = this.ipAddress + "/v1/exams/deleteStandard";
  editSchoolStdApiURL = this.ipAddress + "/v1/exams/saveExam";
  getStudentsbyBranchExamStndURL = this.ipAddress + "/v1/exams/getStudentsbyBranchExamStnd";

  constructor(private apiService: ApiService, private http: HttpClient, private appProp: AppPropertiesService, private loadingComponent: LoadingComponent) {
    this.ipAddress = appProp.getHostName;
  }

  getSchoolExam(): Observable<SchoolExam[]> {
    this.loadingComponent.presentLoading('Fetching school exams...');
    return this.http.get<SchoolExam[]>(this.getAllSchoolStdApiURL)
      .pipe(
        tap(_ => console.log(`Fetched all school exams successfully.`)),
        catchError(this.handleError<SchoolExam[]>(`Error while getting school exams`)),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  getStudentsbyBranchExamStnd(branchId: string, examId: string, standardId: string): Observable<Exams[]> {
    this.loadingComponent.presentLoading('Fetching students by branch, exam, and standard...');
    return this.http.get<Exams[]>(`${this.getStudentsbyBranchExamStndURL}/${branchId}/${examId}/${standardId}`)
      .pipe(
        tap(_ => console.log(`Fetched students successfully.`)),
        catchError(this.handleError<Exams[]>(`Error while fetching students by branch, exam, and standard`)),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  saveSchoolExam(saveSchoolSchoolStd: SchoolExam): Observable<SchoolExam[]> {
    this.loadingComponent.presentLoading('Saving school exam...');
    return this.http.post<SchoolExam[]>(this.saveSchoolStdApiURL, saveSchoolSchoolStd)
      .pipe(
        tap(_ => console.log(`School exam saved successfully.`)),
        catchError(this.handleError<SchoolExam[]>(`Error while saving school exam`)),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  editSchoolExam(saveSchoolSchoolStd: SchoolExam): Observable<SchoolExam[]> {
    this.loadingComponent.presentLoading('Editing school exam...');
    return this.http.put<SchoolExam[]>(this.saveSchoolStdApiURL, saveSchoolSchoolStd)
      .pipe(
        tap(_ => console.log(`School exam edited successfully.`)),
        catchError(this.handleError<SchoolExam[]>(`Error while editing school exam`)),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  deleteSchoolExam(deleteSchoolStdID: string): Observable<SchoolExam[]> {
    this.loadingComponent.presentLoading('Deleting school exam...');
    return this.http.delete<SchoolExam[]>(`${this.deleteSchoolStdApiURL}/${deleteSchoolStdID}`)
      .pipe(
        tap(_ => console.log(`School exam deleted successfully.`)),
        catchError(this.handleError<SchoolExam[]>(`Error while deleting school exam`)),
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
