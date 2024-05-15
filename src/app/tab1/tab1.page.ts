import { Component, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DataStorageService } from '.././services/data-storage.service';
import { LoginFormComponent } from '.././components/login-form/login-form.component'
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  message:string="";

  constructor(
    private router: Router,
    private NavCtrl: NavController,
    private dataStorageService: DataStorageService,
    private modalCtrl: ModalController
  ) {}

  setIsUserLogedin(setValue:boolean ) {
    this.dataStorageService.setData('isUserLogedin', setValue);
  }

  async loadData() {
    //const loginflag = await this.dataStorageService.getData('isUserLogedin');
   // console.log('loginflag Data:', loginflag);
   let loginflag:boolean=false;

    if (!loginflag ) {
      this.openLoginModal();
    }
    
    return true;
  }

  async openLoginModal() { 
    const modal = await this.modalCtrl.create({
      component: LoginFormComponent,
     });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
 
  }

  ngOnInit() {
     this.loadData();
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
   
  routePage(routePage:string){

     if(routePage === "noticeBoard"){
    this.router.navigate(['notice-board']);
    }else if(routePage === "home-work"){
      this.router.navigate(['home-work']);
    }else if(routePage === "class-dairy"){
      this.router.navigate(['class-dairy']);
    }else if(routePage === "time-table"){
      this.router.navigate(['time-table']);
    }else if(routePage === "maks-tabulation"){
      this.router.navigate(['maks-tabulation']);
    }else if(routePage === "holiday-list"){
      this.router.navigate(['holiday-list']);
    }else if(routePage === "events"){
      this.router.navigate(['events']);
    }else if(routePage === "academic-calendar"){
      this.router.navigate(['academic-calendar']);
    }else if(routePage === "school-activities"){
      this.router.navigate(['school-activities']);
    }else if(routePage === "exams"){
      this.router.navigate(['exams']);
    }else if(routePage === "e-dairy"){
      this.router.navigate(['e-dairy']);
    }else if(routePage === "schoole-library"){
      this.router.navigate(['schoole-library']);
    }

  }

}
