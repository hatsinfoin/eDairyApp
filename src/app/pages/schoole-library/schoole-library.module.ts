import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchooleLibraryPageRoutingModule } from './schoole-library-routing.module';

import { SchooleLibraryPage } from './schoole-library.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchooleLibraryPageRoutingModule
  ],
  declarations: [SchooleLibraryPage]
})
export class SchooleLibraryPageModule {}
