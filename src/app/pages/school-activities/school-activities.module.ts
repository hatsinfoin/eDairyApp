import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolActivitiesPageRoutingModule } from './school-activities-routing.module';

import { SchoolActivitiesPage } from './school-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchoolActivitiesPageRoutingModule
  ],
  declarations: [SchoolActivitiesPage]
})
export class SchoolActivitiesPageModule {}
