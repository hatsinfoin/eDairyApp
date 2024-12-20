import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolStudentLeavePage } from './school-student-leave.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolStudentLeavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolStudentLeavePageRoutingModule {}
