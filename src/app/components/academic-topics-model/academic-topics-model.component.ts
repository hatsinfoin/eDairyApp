 import { Component, OnInit,Input } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { NavParams } from '@ionic/angular'; // Use 'ActivatedRoute' in Ionic 4+

@Component({
  selector: 'app-academic-topics-model',
  templateUrl: './academic-topics-model.component.html',
  styleUrls: ['./academic-topics-model.component.scss'],
})
export class AcademicTopicsModelComponent  implements OnInit {

   isModalOpen = false;
   academicStdTopics: any;
    constructor(private modalCtrl: ModalController,private navParams: NavParams) {
    this.academicStdTopics = this.navParams.get('data'); // Replace 'key1' with your actual key
     console.log(this.academicStdTopics);
    }

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  name: string;


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }


}
