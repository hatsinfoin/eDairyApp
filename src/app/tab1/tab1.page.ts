import { Component, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataStorageService } from '.././services/data-storage.service';
import { LoginFormComponent } from '.././components/login-form/login-form.component'
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage-service.service'; // Import your StorageService
import { UserRegistration } from 'src/app/dataDTO/UserRegistration.data';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  message: string = "";
  userDetails: UserRegistration;
  loginflag: boolean = false;

  constructor(
    private router: Router,
    private NavCtrl: NavController,
    private dataStorageService: DataStorageService,
    private modalCtrl: ModalController,
    private storageService: StorageService
  ) { }

  setIsUserLogedin(setValue: boolean) {
    this.dataStorageService.setData('isUserLogedin', setValue);
  }

  ngOnInit() {
    this.checkUserLogin();
  }


  async openLoginModal(s: string) {
    const modal = await this.modalCtrl.create({
      component: LoginFormComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    alert("alert " + s);
    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }

  }


  async checkUserLogin() {
    try {
      // Attempt to get user details from storage
      this.userDetails = await this.storageService.getUserDetails();
      console.log("user ", this.userDetails);
      if (this.userDetails) {
        this.loginflag = true;

        // If user is found, navigate to the app's main page (tabs)
        this.router.navigate(['/tabs']);
      } else {
        // If no user found, open the login modal
        this.openLoginModal("1");
        console.log('User not logged in');
      }
    } catch (error: any) {
      // If an error occurs while retrieving user details, open the login modal
      console.error('Error retrieving user details:', error.message);
      this.openLoginModal("2");
    }
  }


  logout() {
    alert("logout");
    this.storageService.removeUserDetails().then(() => {
      console.log('User logged out');
      this.openLoginModal("3");
      this.userDetails = new UserRegistration();
    });
  }

  onDate() {
    this.router.navigate(['select-date']);
  }
  onBack() {
    this.NavCtrl.back();
  }
  onClick() {

  }
  onSubCate() {
    this.router.navigate(['sub-categories']);
  }

  onProfile() {
    this.router.navigate(['artist-profile']);
  }

  routePage(routePage: string) {

    if (routePage === "noticeBoard") {
      this.router.navigate(['notice-board']);
    } else if (routePage === "home-work") {
      this.router.navigate(['home-work']);
    } else if (routePage === "class-dairy") {
      this.router.navigate(['class-dairy']);
    } else if (routePage === "time-table") {
      this.router.navigate(['time-table']);
    } else if (routePage === "maks-tabulation") {
      this.router.navigate(['maks-tabulation']);
    } else if (routePage === "holiday-list") {
      this.router.navigate(['holiday-list']);
    } else if (routePage === "events") {
      this.router.navigate(['events']);
    } else if (routePage === "academic-calendar") {
      this.router.navigate(['academic-calendar']);
    } else if (routePage === "school-activities") {
      this.router.navigate(['school-activities']);
    } else if (routePage === "exams") {
      this.router.navigate(['exams']);
    } else if (routePage === "e-dairy") {
      this.router.navigate(['e-dairy']);
    } else if (routePage === "schoole-library") {
      this.router.navigate(['schoole-library']);
    } else if (routePage === "school-student-leave") {
      this.router.navigate(['school-student-leave']);
    }
  }
}
