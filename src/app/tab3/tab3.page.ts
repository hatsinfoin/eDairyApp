import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {  OnInit } from '@angular/core';
 import { StudentProfileService } from '../services/student.service';
import { SchoolStudentProfile } from 'src/app/dataDTO/schoolStudentPriofile.data';
import { ModalController } from '@ionic/angular';
import { StudentFormComponent } from '../components/student-form/student-form.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private router: Router,
    private modalCtrl: ModalController,
    private stdProfileService: StudentProfileService,
    private navCtrl: NavController) {}

    schoolStudentList: any;
    message = 'This modal example uses the modalController to present and dismiss modals.';
  
  ngOnInit() {

    this.reFetchStudentProfile();

  }
  goToBack() {
    this.navCtrl.back();
  }
  goToEdit() {
    this.openEditEventModal(this.schoolStudentList);
  }
  goToSetting() {
    this.router.navigate(['setting']);
  }


  
  async openEventModal() {
    const modal = await this.modalCtrl.create({
      component: StudentFormComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
    this.reFetchStudentProfile();

  }

  async openEditEventModal(schoolStudentObj: SchoolStudentProfile) {
    const modal = await this.modalCtrl.create({
      component: StudentFormComponent,
      componentProps: { receivedData: schoolStudentObj },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
    this.reloadPage();
    this.reFetchStudentProfile();

  }

  reFetchStudentProfile() {
    this.stdProfileService.getSchoolStudentProfile("649c4ba3c6b74c004439ca1b").subscribe((data) => {
      console.log(data);
      this.schoolStudentList = data;
      //  this.iterateSchoolEvents(data);

    });
  }


  reloadPage() {
    this.router.navigateByUrl('/tabs/tab3').then(() => {
      this.router.navigate([this.router.url]);
    });
  }

}
