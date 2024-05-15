import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassDairyPage } from './class-dairy.page';

const routes: Routes = [
  {
    path: '',
    component: ClassDairyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassDairyPageRoutingModule {}
