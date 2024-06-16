import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SchoolNoticeBoard } from 'src/app/dataDTO/schoolNoticeBoard.data'; 
import { ApiService } from '../services/api.service';
import { AppPropertiesService } from '../services/app-properties.service';
import { CommunicaitonMessage } from 'src/app/dataDTO/communicaitonMessage.data';

@Injectable({
  providedIn: 'root'
})
export class NoticeBoardService {

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ipAddress = this.appProp.getHostName;
  getAllApiURL = this.ipAddress+"/v1/noticeboard/getAllNotices";
  saveApiURL =  this.ipAddress+"/v1/noticeboard/saveNoticeBoard";
  deleteApiURL =  this.ipAddress+"/v1/noticeboard/deleteNoticeBoardsByID";
  editApiURL =  this.ipAddress+"/v1/noticeboard/editEvent";
  communicationServiceURL =  this.ipAddress+"/v1/commonUtil/sendWhatAppMessage";
  sendWhatAppMessagegetAPI =  this.ipAddress+"/v1/commonUtil/sendWhatAppMessageget";
  
  constructor(private apiService: ApiService,private http: HttpClient,private appProp: AppPropertiesService) { 
    this.ipAddress = appProp.getHostName;
    console.log(this.ipAddress);

  }

  
  getSchoolNoticeBoard(): Observable<SchoolNoticeBoard[]> {
     return this.http.get<SchoolNoticeBoard[]>(this.getAllApiURL)
      .pipe(
        tap(_ => console.log(`fetched All School Events Successfuly: `)),
        catchError(this.handleError<SchoolNoticeBoard[]>(`Error while getting getSchoolEvents`))
      );
  }


  saveSchoolNoticeBoard(saveSchoolEvent:SchoolNoticeBoard): Observable<SchoolNoticeBoard[]> {
    console.log("calling saveSchoolEvent ");
    console.log(this.saveApiURL);
    console.log(saveSchoolEvent);
    return this.http.post<SchoolNoticeBoard[]>(this.saveApiURL,saveSchoolEvent)
     .pipe(
       tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
       catchError(this.handleError<SchoolNoticeBoard[]>(`Error while saving saveSchoolEvents`))
     );
 }

 editSchoolNoticeBoard(saveSchoolEvent:SchoolNoticeBoard): Observable<SchoolNoticeBoard[]> {
  console.log("calling saveSchoolEvent ");
  console.log(this.saveApiURL);
  console.log(saveSchoolEvent);
  return this.http.put<SchoolNoticeBoard[]>(this.saveApiURL,saveSchoolEvent)
   .pipe(
     tap(_ => console.log(`saveSchoolEvent Saved Successlfy: `)),
     catchError(this.handleError<SchoolNoticeBoard[]>(`Error while saving saveSchoolEvents`))
   );
}



 deleteSchoolNoticeBoard(deleteEventID:string): Observable<SchoolNoticeBoard[]> {
  console.log("calling deleteSchoolEvents ");
  console.log(this.deleteApiURL+"/"+deleteEventID);
  console.log(deleteEventID);
  return this.http.delete<SchoolNoticeBoard[]>(this.deleteApiURL+"/"+deleteEventID)
   .pipe(
     tap(_ => console.log(`deleteSchoolEvents  Successlfy: `)),
     catchError(this.handleError<SchoolNoticeBoard[]>(`Error while saving saveSchoolEvents`))
   );
}
 
  //saveEvent

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
     // alert(error);
      //alert(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  sendCommunicaitonMessage(communicaitonMessage: CommunicaitonMessage): Observable<string> {
    console.log("calling saveSchoolSchoolStd ");
     console.log(communicaitonMessage.sendMessage);
    console.log(this.communicationServiceURL);
    return this.http.post<string>(this.communicationServiceURL, communicaitonMessage)
      .pipe(
        tap(_ => console.log(`saveSchoolSchoolStd Saved Successlfy: `)),
        catchError(this.handleError<string>(`Error while saving saveSchoolStandard`))
      );
  }
}
