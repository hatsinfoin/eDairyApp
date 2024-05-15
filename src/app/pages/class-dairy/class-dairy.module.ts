import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassDairyPageRoutingModule } from './class-dairy-routing.module';

import { ClassDairyPage } from './class-dairy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassDairyPageRoutingModule
  ],
  declarations: [ClassDairyPage]
})
export class ClassDairyPageModule {}
