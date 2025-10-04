import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {  OnInit } from '@angular/core';
 import { StudentProfileService } from '../services/student.service';
import { SchoolStudentProfile } from 'src/app/dataDTO/schoolStudentPriofile.data';
import { ModalController } from '@ionic/angular';
import { StudentFormComponent } from '../components/student-form/student-form.component';
import { StorageService } from '../services/storage-service.service'; // Import your StorageService

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private router: Router,
    private modalCtrl: ModalController,
    private stdProfileService: StudentProfileService,
    private navCtrl: NavController,
    private storageService: StorageService) { }

 
  studentProfileDetais: SchoolStudentProfile;

    message = 'This modal example uses the modalController to present and dismiss modals.';
  
  ngOnInit() {

    this.reFetchStudentProfile();

  }
  goToBack() {
    this.navCtrl.back();
  }
  goToEdit() {
    this.openEditEventModal(this.studentProfileDetais);
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

  async reFetchStudentProfile() {

    this.studentProfileDetais = await this.storageService.getStudentDetails();
    console.log(this.studentProfileDetais);
    
  }


  reloadPage() {
    this.router.navigateByUrl('/tabs/tab3').then(() => {
      this.router.navigate([this.router.url]);
    });
  }

}
