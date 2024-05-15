import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicCalendarPageRoutingModule } from './academic-calendar-routing.module';

import { AcademicCalendarPage } from './academic-calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcademicCalendarPageRoutingModule
  ],
  declarations: [AcademicCalendarPage]
})
export class AcademicCalendarPageModule {}
