import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EDairyPageRoutingModule } from './e-dairy-routing.module';

import { EDairyPage } from './e-dairy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EDairyPageRoutingModule
  ],
  declarations: [EDairyPage]
})
export class EDairyPageModule {}
