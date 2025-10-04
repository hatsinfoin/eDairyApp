import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { DataStorageService } from '../services/data-storage.service';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { StorageService } from '../services/storage-service.service';
import { UserRegistration } from 'src/app/dataDTO/UserRegistration.data';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  userDetails: UserRegistration;
  loginflag = false;
  enableSoftLanding = false;

  // Cards data for dynamic rendering
  cards = [
    { label: 'Notice Board', route: 'notice-board', image: 'assets/images/Notice-board.png' },
    { label: 'Home Work', route: 'home-work', image: 'assets/images/homework.png' },
    { label: 'Class Dairy', route: 'e-dairy', image: 'assets/images/edairy.png' },
    { label: 'Time Table', route: 'time-table', image: 'assets/images/TimeTable.png' },
    { label: 'Marks Tablulation', route: 'maks-tabulation', image: 'assets/images/Markssheet.png' },
    { label: 'Holiday List', route: 'holiday-list', image: 'assets/images/HoidayList.png' },
    { label: 'Events', route: 'events', image: 'assets/images/event-list.png' },
    { label: 'Academic Calendar', route: 'academic-calendar', image: 'assets/images/AcademicCalendar.png' },
    { label: 'Attendance', route: 'school-activities', image: 'assets/images/activities.png' },
    { label: 'Exams', route: 'exams', image: 'assets/images/exam.png' },
    { label: 'School e-library', route: 'schoole-library', image: 'assets/images/library.png' },
    { label: 'Leaves', route: 'school-student-leave', image: 'assets/images/Notice-board.png' }
  ];

  // Group cards into rows of 2
  get cardRows() {
    const rows = [];
    for (let i = 0; i < this.cards.length; i += 2) {
      rows.push(this.cards.slice(i, i + 2));
    }
    return rows;
  }

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private dataStorageService: DataStorageService,
    private modalCtrl: ModalController,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.handleUserLogin();
    setTimeout(() => {
      this.enableSoftLanding = true;
    }, 300); // Allow view to stabilize before animation
  }

  async openLoginModal(reason: string) {
    const modal = await this.modalCtrl.create({
      component: LoginFormComponent,
    });
    await modal.present();
    const { role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.handleUserLogin();
    }
  }

  async handleUserLogin() {
    try {
      this.userDetails = await this.storageService.getUserDetails();
      this.loginflag = !!this.userDetails;
      if (!this.loginflag) {
        this.openLoginModal('initial');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error retrieving user details:', error.message);
      } else {
        console.error('Unknown error retrieving user details:', error);
      }
    }

  }

  logout() {
    this.storageService.removeUserDetails().then(() => {
      this.userDetails = new UserRegistration();
      this.openLoginModal('logout');
    });
  }

  routePage(page: string) {
    this.router.navigate([page]);
  }

  onBack() {
    this.navCtrl.back();
  }
}
