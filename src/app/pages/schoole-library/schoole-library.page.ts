import { Component, OnInit } from '@angular/core';
import { StandardService } from '../../services/standard.service';
import { SchoolLibraryService } from '../../services/schooleLibrary.service';
import { SchoolStandard } from 'src/app/dataDTO/schoolStandard.data';
import { SchoolLibrary } from 'src/app/dataDTO/schooleLibrary.data';
import { SchooleLibraryModelComponent } from '../../components/schoole-library-model/schoole-library-model.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schoole-library',
  templateUrl: './schoole-library.page.html',
  styleUrls: ['./schoole-library.page.scss'],
})
export class SchooleLibraryPage implements OnInit {

  schoolStandardList: SchoolStandard[];
  message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(private router: Router,private schoolLibraryService :SchoolLibraryService, private standardService: StandardService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.reFetchAllEvents();
  }

  
  reFetchAllEvents() {
    this.standardService.getSchoolStandard().subscribe((data) => {
      console.log(data);
      this.schoolStandardList = data; 
    });
  } 

  async openSchooleLibraryModal(branchId:String,standardId: String) {
    const modal = await this.modalCtrl.create({
      component: SchooleLibraryModelComponent,
      componentProps: { branchId: branchId ,standardId: standardId},
     });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
    this.reFetchAllEvents();

  }

  routePage(routePage:string){
    if(routePage === "landingPage"){
      this.router.navigate(['tab1']);
    }
  }

}
