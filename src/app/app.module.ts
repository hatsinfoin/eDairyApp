import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpAPIService } from '../app/services/http-api.service';
import { LoadingComponent } from './loading/loading.component';  // Import LoadingService
import { AcademicTopicsModelComponent } from './components/academic-topics-model/academic-topics-model.component';
import { SchooleLibraryModelComponent } from './components/schoole-library-model/schoole-library-model.component';
import { NotificationFormComponent } from './components/notification-form/notification-form.component';
import { HolidayFormComponent } from './components/holiday-form/holiday-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { HomeWorkFormComponent } from './components/home-work-form/home-work-form.component';


import awsconfig from './aws-exports';

@NgModule({
  declarations: [
    AppComponent,
    AcademicTopicsModelComponent,
    SchooleLibraryModelComponent,
    NotificationFormComponent,
    HolidayFormComponent,
    LoginFormComponent,
    StudentFormComponent,
    HomeWorkFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoadingComponent,  // Added LoadingService
    HttpAPIService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
