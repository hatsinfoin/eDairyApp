import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpAPIService } from '../app/services/http-api.service';
import { AcademicTopicsModelComponent } from './components/academic-topics-model/academic-topics-model.component';
import { SchooleLibraryModelComponent } from './components/schoole-library-model/schoole-library-model.component';
import { NotificationFormComponent } from './components/notification-form/notification-form.component';
import { HolidayFormComponent } from './components/holiday-form/holiday-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
 import awsconfig from './aws-exports';
 //import { Amplify1 } from "d:/WorkSpace/VisualStudioRepo/eDairyApp/eDairyApp/node_modules/aws-amplify/dist/esm/index";
 //import { Amplify } from "d:/WorkSpace/VisualStudioRepo/eDairyApp/eDairyApp/node_modules/aws-amplify/dist/esm/index";

//Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent,AcademicTopicsModelComponent,SchooleLibraryModelComponent,NotificationFormComponent,HolidayFormComponent,LoginFormComponent,StudentFormComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,ReactiveFormsModule,IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HttpAPIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
 