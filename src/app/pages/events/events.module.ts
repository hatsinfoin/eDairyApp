import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import { EventsformComponent } from '../../components/eventsform/eventsform.component';
 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [EventsPage,EventsformComponent]
})
export class EventsPageModule {}
