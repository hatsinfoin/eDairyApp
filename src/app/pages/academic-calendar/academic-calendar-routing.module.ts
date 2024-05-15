import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicCalendarPage } from './academic-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicCalendarPageRoutingModule {}
