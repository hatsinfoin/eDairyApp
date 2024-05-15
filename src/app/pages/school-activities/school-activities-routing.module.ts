import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolActivitiesPage } from './school-activities.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolActivitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolActivitiesPageRoutingModule {}
