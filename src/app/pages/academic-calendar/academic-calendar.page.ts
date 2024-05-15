import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolStandard } from 'src/app/dataDTO/schoolStandard.data';
import { AcademicCalendar } from 'src/app/dataDTO/schoolAcademicCalendars.data';
import { StandardService } from '../../services/standard.service';
import { AcademicCalendarService } from '../../services/academicCalendar.service';
import { ModalController } from '@ionic/angular';
import { AcademicTopicsModelComponent } from '../../components/academic-topics-model/academic-topics-model.component';

@Component({
  selector: 'app-academic-calendar',
  templateUrl: './academic-calendar.page.html',
  styleUrls: ['./academic-calendar.page.scss'],
})
export class AcademicCalendarPage implements OnInit {

  
  constructor(private modalCtrl: ModalController,private router: Router,private standardService: StandardService,private academicCalendarService: AcademicCalendarService) { }
  schoolStandardList: SchoolStandard[];
  academicCalendarList: AcademicCalendar[];
  message = 'This modal example uses the modalController to present and dismiss modals.';

  ngOnInit() {
    this.reFetchAllStandards();
    this.fetchAcademicCalendarList();
  }

  isModalOpen = false;

  
  reFetchAllStandards() {
    this.standardService.getSchoolStandard().subscribe((data) => {
      console.log(data);
      this.schoolStandardList = data;
 
    });
  } 


  fetchAcademicCalendarList(){
    this.academicCalendarService.getAcademicCalendar().subscribe((data) => {
      console.log(data);
      this.academicCalendarList = data;
 
    });
  }

  routePage(routePage:string){
    if(routePage === "landingPage"){
      this.router.navigate(['tab1']);
    }
  }

  private values: string[] = ['first', 'second', 'third'];

  accordionGroupChange = (ev: any) => {
    const collapsedItems = this.values.filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;

    console.log(
      `Expanded: ${selectedValue === undefined ? 'None' : ev.detail.value} | Collapsed: ${collapsedItems.join(', ')}`
    );
  };

  
  async openaacademicCalendarModal(academicStdTopics:any) {
    const modal = await this.modalCtrl.create({
      component: AcademicTopicsModelComponent,
      componentProps: { data: academicStdTopics },

    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }


}
