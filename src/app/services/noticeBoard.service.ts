import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { SchoolNoticeBoard } from 'src/app/dataDTO/schoolNoticeBoard.data';
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';
import { CommunicaitonMessage } from 'src/app/dataDTO/communicaitonMessage.data';
import { LoadingComponent } from '../loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class NoticeBoardService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllApiURL = this.ipAddress + "/v1/noticeboard/getAllNotices";
  saveApiURL = this.ipAddress + "/v1/noticeboard/saveNoticeBoard";
  deleteApiURL = this.ipAddress + "/v1/noticeboard/deleteNoticeBoardsByID";
  editApiURL = this.ipAddress + "/v1/noticeboard/editEvent";
  communicationServiceURL = this.ipAddress + "/v1/commonUtil/sendWhatAppMessage";
  sendWhatAppMessagegetAPI = this.ipAddress + "/v1/commonUtil/sendWhatAppMessageget";

  constructor(private apiService: ApiService, private http: HttpClient, private appProp: AppPropertiesService, private loadingComponent: LoadingComponent) {
    this.ipAddress = appProp.getHostName;
    console.log(this.ipAddress);
  }

  getSchoolNoticeBoard(): Observable<SchoolNoticeBoard[]> {
    this.loadingComponent.presentLoading('Fetching school notice board...');
    return this.http.get<SchoolNoticeBoard[]>(this.getAllApiURL)
      .pipe(
        tap(_ => console.log(`Fetched all school events successfully.`)),
        catchError(this.handleError<SchoolNoticeBoard[]>('Error while getting school events')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  saveSchoolNoticeBoard(saveSchoolEvent: SchoolNoticeBoard): Observable<SchoolNoticeBoard[]> {
    this.loadingComponent.presentLoading('Saving school notice board...');
    return this.http.post<SchoolNoticeBoard[]>(this.saveApiURL, saveSchoolEvent)
      .pipe(
        tap(_ => console.log(`School notice board saved successfully.`)),
        catchError(this.handleError<SchoolNoticeBoard[]>('Error while saving school notice board')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  editSchoolNoticeBoard(saveSchoolEvent: SchoolNoticeBoard): Observable<SchoolNoticeBoard[]> {
    this.loadingComponent.presentLoading('Editing school notice board...');
    return this.http.put<SchoolNoticeBoard[]>(this.saveApiURL, saveSchoolEvent)
      .pipe(
        tap(_ => console.log(`School notice board edited successfully.`)),
        catchError(this.handleError<SchoolNoticeBoard[]>('Error while editing school notice board')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  deleteSchoolNoticeBoard(deleteEventID: string): Observable<SchoolNoticeBoard[]> {
    this.loadingComponent.presentLoading('Deleting school notice board...');
    return this.http.delete<SchoolNoticeBoard[]>(`${this.deleteApiURL}/${deleteEventID}`)
      .pipe(
        tap(_ => console.log(`School notice board deleted successfully.`)),
        catchError(this.handleError<SchoolNoticeBoard[]>('Error while deleting school notice board')),
        finalize(() => this.loadingComponent.dismissLoading())
      );
  }

  sendCommunicaitonMessage(communicaitonMessage: CommunicaitonMessage): Observable<string> {
    this.loadingComponent.presentLoading('Sending communication message...');
    return this.http.post<string>(this.communicationServiceURL, communicaitonMessage)
      .pipe(
        tap(_ => console.log(`Communication message sent successfully.`)),
        catchError(this.handleError<string>('Error while sending communication message')),
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
