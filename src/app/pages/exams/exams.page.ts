import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StandardService } from '../../services/standard.service';
import { SchoolStandard } from 'src/app/dataDTO/schoolStandard.data';
import { ModalController } from '@ionic/angular';
import { EventsformComponent } from '../../components/eventsform/eventsform.component';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.page.html',
  styleUrls: ['./exams.page.scss'],
})
export class ExamsPage implements OnInit {

  constructor(private router: Router,private standardService: StandardService, private modalCtrl: ModalController) { }

   

  routePage(routePage:string){
    if(routePage === "landingPage"){
      this.router.navigate(['tab1']);
    }
  }

  schoolStandardList: SchoolStandard[];
  message = 'This modal example uses the modalController to present and dismiss modals.';

  ngOnInit() {
    this.reFetchAllEvents();
  }

    

  reFetchAllEvents() {
    this.standardService.getSchoolStandard().subscribe((data) => {
      console.log(data);
      this.schoolStandardList = data;
 
    });
  } 

}
