import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HolidaysService } from '../../services/holidays.service';
import { ModalController } from '@ionic/angular';
import { HolidayFormComponent } from '../../components/holiday-form/holiday-form.component';
import { SchoolHolidays  } from 'src/app/dataDTO/schoolHolidays.data';
  
@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.page.html',
  styleUrls: ['./holiday-list.page.scss'],
})
export class HolidayListPage implements OnInit {

  constructor(private router: Router, private holidaysService: HolidaysService, private modalCtrl: ModalController) { }
  message = 'This modal example uses the modalController to present and dismiss modals.';
  schoolHolidayList: any;

  ngOnInit() {
    this.reFetchAllHolidayList();
    //this.getImageFromS3();
  }

  routePage(routePage:string){
    if(routePage === "landingPage"){
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


  async openHolidayModal() {
    const modal = await this.modalCtrl.create({
      component: HolidayFormComponent,
    });
    modal.present();


    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
    this.reFetchAllHolidayList();

  }

  async openEditHolidayModal(schoolHolidayObj: SchoolHolidays) {
    const modal = await this.modalCtrl.create({
      component: HolidayFormComponent,
      componentProps: { data: schoolHolidayObj },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
    this.reFetchAllHolidayList();

  }

  iterateSchoolHolidays(schoolHolidaysList: any) {
    for (const event of schoolHolidaysList) {
      // Perform logic for each event
      console.log(`Holiday Title: ${event._id}`);
      this.values.push(event._id);
    }
  }

  reFetchAllHolidayList() {
    this.holidaysService.getSchoolHolidayList().subscribe((data) => {
      console.log(data);
      this.schoolHolidayList = data;
      //  this.iterateSchoolHolidays(data);

    });
  }


  deleteSchoolHoliday(schoolHolidayId: string) {
    alert(schoolHolidayId);
    this.holidaysService.deleteSchoolHolidays(schoolHolidayId).subscribe((data) => {
      console.log(data);
      this.reFetchAllHolidayList();
    });
  }

  editSchoolHoliday(schoolHolidayObj: SchoolHolidays) {
    this.openEditHolidayModal(schoolHolidayObj);
  }

  duplicateSchoolHoliday(schoolHolidayObj: SchoolHolidays) {
    schoolHolidayObj._id=null;
    console.log("Duplicate");
    console.log(schoolHolidayObj);
    this.openEditHolidayModal(schoolHolidayObj);
  }
  

  imageUrl: string ="https://schooledairyimagbucket.s3.ap-south-1.amazonaws.com/SchoolHomePage/SchooleDairyIcon.png";
 

}
