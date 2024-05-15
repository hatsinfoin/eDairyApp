import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CommunicaitonMessage } from 'src/app/dataDTO/communicaitonMessage.data'; 

import { ApiService } from './api.service';
import { AppPropertiesService } from '../services/app-properties.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicaitonMessageService {

  //communicaitonMessage:CommunicaitonMessage;
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  communicationServiceURL = "http://" + this.ipAddress + "/v1/commonUtil/sendWhatAppMessage";
  

  constructor(private communicaitonMessage:CommunicaitonMessage,private apiService: ApiService, private http: HttpClient,private appProp: AppPropertiesService) { 
    this.ipAddress = appProp.getHostName;
  }

 
  sendCommunicaitonMessage(communicaitonMessage: CommunicaitonMessage): Observable<CommunicaitonMessage[]> {
    console.log("calling saveSchoolSchoolStd ");
     console.log(communicaitonMessage);
    console.log(this.communicationServiceURL);
    return this.http.post<CommunicaitonMessage[]>(this.communicationServiceURL, communicaitonMessage)
      .pipe(
        tap(_ => console.log(`saveSchoolSchoolStd Saved Successlfy: `)),
        catchError(this.handleError<CommunicaitonMessage[]>(`Error while saving saveSchoolStandard`))
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
