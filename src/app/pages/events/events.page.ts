import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { EventsService } from '../../services/events.service';
import { StorageService } from '../../services/storage-service.service';
import { EventsformComponent } from '../../components/eventsform/eventsform.component';
import { SchoolEvents } from 'src/app/dataDTO/schoolEvents.data';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  eventsList: SchoolEvents[] = [];

  constructor(
    private router: Router,
    private eventsService: EventsService,
    private storageService: StorageService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  async ngOnInit() {
    await this.loadEvents();
  }

  routeTo(route: string) {
    if (route === 'landing') this.router.navigate(['tab1']);
  }

  async loadEvents() {
    try {
      const student = await this.storageService.getStudentDetails();
      if (!student?.branchId) return;
      const events = await this.eventsService
        .getEventsByBranchId(student.branchId)
        .toPromise();
      this.eventsList = events ?? [];
    } catch (err) {
      console.error('Failed to load events:', err);
    }
  }

  onAccordionChange(ev: any) {
    const expanded = ev.detail.value;
    console.log('Accordion expanded:', expanded);
  }

  async openEventModal(eventObj?: SchoolEvents) {
    const modal = await this.modalCtrl.create({
      component: EventsformComponent,
      componentProps: eventObj ? { data: eventObj } : undefined,
    });
    await modal.present();
    const { role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      await this.loadEvents();
    }
  }

  editEvent(ev: SchoolEvents) {
    this.openEventModal(ev);
  }

  duplicateEvent(ev: SchoolEvents) {
    const duplicate = { ...ev, _id: null };
    this.openEventModal(duplicate);
  }

  async deleteEvent(eventId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this event?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'confirm',
          handler: async () => {
            try {
              await this.eventsService.deleteSchoolEvents(eventId).toPromise();
              await this.loadEvents();
            } catch (err) {
              console.error('Delete failed:', err);
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
