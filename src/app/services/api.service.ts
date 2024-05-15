/*
  Authors : bunchdevelopers (Rahul Jograna)
  Website : https://bunchdevelopers.com/
  App Name : ionic6Template Pack
  This App Template Source code is licensed as per the
  terms found in the Website https://bunchdevelopers.com/license
  Copyright and Good Faith Purchasers © 2021-present bunchdevelopers.
*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // apiURL = "http://192.168.0.105:8080/v1";
  apiURL = "http://192.168.0.105:8080/v1/Category/getProductsByCategory/JEWELLERY";
  constructor(
    private http: HttpClient
  ) { }
  get(url:string) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.get(this.apiURL + url, header);
  } 
   
}
