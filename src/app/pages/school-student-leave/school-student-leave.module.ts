import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolStudentLeavePageRoutingModule } from './school-student-leave-routing.module';

import { SchoolStudentLeavePage } from './school-student-leave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchoolStudentLeavePageRoutingModule
  ],
  declarations: [SchoolStudentLeavePage]
})
export class SchoolStudentLeavePageModule { }
