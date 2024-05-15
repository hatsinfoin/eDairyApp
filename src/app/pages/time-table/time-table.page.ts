import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolTimetable } from 'src/app/dataDTO/schoolTimetable.data';
import { ModalController } from '@ionic/angular';
import { EventsformComponent } from '../../components/eventsform/eventsform.component';
import { TimetableService } from '../../services/timetable.service';


@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.page.html',
  styleUrls: ['./time-table.page.scss'],
})

export class TimeTablePage implements OnInit {

  constructor(private router: Router,private timetableService: TimetableService, private modalCtrl: ModalController) { }

  

  routePage(routePage:string){
    if(routePage === "landingPage"){
      this.router.navigate(['tab1']);
    }
  }


  schoolTimetableList: any;
  message = 'This modal example uses the modalController to present and dismiss modals.';

  ngOnInit() {
    this.reFetchAllTimetable();
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
    this.reFetchAllTimetable();

  }

  async openEditEventModal(schoolEventObj: SchoolTimetable) {
    const modal = await this.modalCtrl.create({
      component: EventsformComponent,
      componentProps: { data: schoolEventObj },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
    this.reFetchAllTimetable();

  }

  iterateSchoolEvents(schoolEventsList: any) {
    for (const event of schoolEventsList) {
      // Perform logic for each event
      console.log(`Event Title: ${event._id}`);
      this.values.push(event._id);
    }
  }

  reFetchAllTimetable() {
    this.timetableService.getAllSchoolTimetables().subscribe((data) => {
      console.log(data);
      this.schoolTimetableList = data;
      //  this.iterateSchoolEvents(data);

    });
  }


  deleteSchoolEvent(schoolEventId: string) {
    this.timetableService.deleteSchoolTimetable(schoolEventId).subscribe((data) => {
      console.log(data);
      this.reFetchAllTimetable();
    });
  }

  editSchoolEvent(schoolEventObj: SchoolTimetable) {
    this.openEditEventModal(schoolEventObj);
  }

  duplicateSchoolEvent(schoolEventObj: SchoolTimetable) {
    schoolEventObj._id=null;
    console.log("Duplicate");
    console.log(schoolEventObj);
    this.openEditEventModal(schoolEventObj);
  }
  


}
