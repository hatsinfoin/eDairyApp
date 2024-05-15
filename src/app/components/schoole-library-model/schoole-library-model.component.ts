import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { NavParams } from '@ionic/angular'; // Use 'ActivatedRoute' in Ionic 4+
import { FormsModule } from '@angular/forms';
import { SchoolLibraryService } from '../../services/schooleLibrary.service';
import { SchoolLibrary } from 'src/app/dataDTO/schooleLibrary.data';

@Component({
  selector: 'app-schoole-library-model',
  templateUrl: './schoole-library-model.component.html',
  styleUrls: ['./schoole-library-model.component.scss'],
})
export class SchooleLibraryModelComponent  implements OnInit {


  branchId:String;
  standardId:String;
  
  constructor( private schoolLibraryService :SchoolLibraryService, private modalCtrl: ModalController,private navParams: NavParams) {

    this.branchId = this.navParams.get('branchId');
    this.standardId = this.navParams.get('standardId');

   }
  name: string;
  selectedSegment: string = 'custom';
  segment: string;
  schoolLibraryList: SchoolLibrary[];

  getLibDetlsByBranchStd(){
     this.schoolLibraryService.getLibDetlsByBranchStd(this.branchId,this.standardId).subscribe((data) => {
       this.schoolLibraryList = data; 
    });
  }

  ngOnInit() {
    this.getLibDetlsByBranchStd();

  }
  changeSegment(segment:string){
      this.selectedSegment=segment;
  }
  
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }


}
