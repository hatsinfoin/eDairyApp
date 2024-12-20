import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppPropertiesService {

  constructor() { }

  private hostName: string = 'http://192.168.135.79:8080';
  //private hostName: string = 'https://edairyservice.azurewebsites.net';
  // private hostName: string = '8324beanstack-env.eba-wiq3yupf.ap-south-1.elasticbeanstalk.com';
  // private hostName:string ="hatsschooledairy.ap-south-1.elasticbeanstalk.com";  

  get getHostName(): string {
    return this.hostName;
  }

  set setHostName(value: string) {
    this.hostName = value;
  }

}
