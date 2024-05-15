import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaksTabulationPageRoutingModule } from './maks-tabulation-routing.module';

import { MaksTabulationPage } from './maks-tabulation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaksTabulationPageRoutingModule
  ],
  declarations: [MaksTabulationPage]
})
export class MaksTabulationPageModule {}
