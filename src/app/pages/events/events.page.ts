import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { SchoolEvents } from 'src/app/dataDTO/schoolEvents.data';
import { ModalController } from '@ionic/angular';
import { EventsformComponent } from '../../components/eventsform/eventsform.component';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  constructor(private router: Router, private eventsService: EventsService, private modalCtrl: ModalController) { }
  schoolEventsList: any;
  message = 'This modal example uses the modalController to present and dismiss modals.';

  ngOnInit() {
    this.reFetchAllEvents();
  }

  routePage(routePage: string) {
    if (routePage === "landingPage") {
      this.router.navigate(['tab1']);
    }
  }


  values: string[] = [];

  accordionGroupChange = (ev: any) => {
    const collapsedItems = this.values.filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;

    console.log(
      `Expanded: ${selectedValue === undefined ? 'None' : ev.detail.value} | Collapsed: ${collapsedItems.join(', ')}`
    );
  };


  async openEventModal() {
    const modal = await this.modalCtrl.create({
      component: EventsformComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
    this.reFetchAllEvents();

  }

  async openEditEventModal(schoolEventObj: SchoolEvents) {
    const modal = await this.modalCtrl.create({
      component: EventsformComponent,
      componentProps: { data: schoolEventObj },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
    this.reFetchAllEvents();

  }

  iterateSchoolEvents(schoolEventsList: any) {
    for (const event of schoolEventsList) {
      // Perform logic for each event
      console.log(`Event Title: ${event._id}`);
      this.values.push(event._id);
    }
  }

  reFetchAllEvents() {
    this.eventsService.getSchoolEvents().subscribe((data) => {
      console.log(data);
      this.schoolEventsList = data;
      //  this.iterateSchoolEvents(data);

    });
  }


  deleteSchoolEvent(schoolEventId: string) {
    this.eventsService.deleteSchoolEvents(schoolEventId).subscribe((data) => {
      console.log(data);
      this.reFetchAllEvents();
    });
  }

  editSchoolEvent(schoolEventObj: SchoolEvents) {
    this.openEditEventModal(schoolEventObj);
  }

  duplicateSchoolEvent(schoolEventObj: SchoolEvents) {
    schoolEventObj._id=null;
    console.log("Duplicate");
    console.log(schoolEventObj);
    this.openEditEventModal(schoolEventObj);
  }
  

}
