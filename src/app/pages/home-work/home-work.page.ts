import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HomeWorkFormComponent } from '../../components/home-work-form/home-work-form.component';
import { Homework } from '../../dataDTO/schookHomework.data';
import { HomeworkServiceService } from '../../services/homework-service.service';
import { StorageService } from '../../services/storage-service.service'; // Import your StorageService


@Component({
  selector: 'app-home-work',
  templateUrl: './home-work.page.html',
  styleUrls: ['./home-work.page.scss'],
})
export class HomeWorkPage implements OnInit {

  homeworkList: any;
  uniqueSubjectIds: string[];
  selectedDate: string;
  message = 'This modal example uses the modalController to present and dismiss modals.';

  // Variable to hold the selected subjectId
  selectedSubject: string = '';


  constructor(private router: Router, private modalCtrl: ModalController,
    private hwService: HomeworkServiceService, private storageService: StorageService
  ) {

    // Initialize selectedDate with the current date
    this.selectedDate = new Date().toISOString(); // Sets the current date as default

  }

  ngOnInit() {
    this.getTodaysHomework();

  }

  // Filter homework list based on the selected subjectId
  filteredHomeworkList() {
    if (!this.homeworkList) {
      return [];
    }
    return this.homeworkList.filter((homework: { subjectId: string; }) => homework.subjectId === this.selectedSubject);
  }

  routePage(routePage: string) {
    if (routePage === "landingPage") {
       this.router.navigate(['tab1']);
    }
  }


  reFetchAllHomeworkList() {
    this.hwService.getHomeworkList().subscribe((data) => {
      console.log(data);
      this.homeworkList = data;
      this.uniqueSubjectIds = Array.from(new Set(this.homeworkList.map((homework: { subjectId: any; }) => homework.subjectId)));

      //  this.iterateSchoolHolidays(data);

    });
  }

  deleteHomeWork(schoolHomeworkId: string) {

    this.hwService.deleteHomeWork(schoolHomeworkId).subscribe((data) => {
      console.log(data);
      this.getTodaysHomework();
    });
  }

  editSchoolNoticeBoard(homeworkObj: Homework) {
    this.openEditEventModal(homeworkObj);
  }

  createSchoolNoticeBoard() {
     this.openEditEventModal();


  }
  
  duplicateSchoolNoticeBoard(homeworkObj: Homework) {    
    homeworkObj.id = null;
    console.log("Duplicate");
    console.log(homeworkObj);
    this.openEditEventModal(homeworkObj);
  }


  async openEditEventModal(homeworkObj?: Homework) {
    console.log("Sending to modal");

    if (homeworkObj) {
      console.log(homeworkObj);
    }

    const modal = await this.modalCtrl.create({
      component: HomeWorkFormComponent,
      ...(homeworkObj && {
        componentProps: { data: homeworkObj },
      }),
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }

    this.getTodaysHomework();
  }




  trimDateTime(dateTimeStr: string): string {
    if (!dateTimeStr) return '';
    const index = dateTimeStr.indexOf('T');
    return index !== -1 ? dateTimeStr.substring(0, index) : dateTimeStr;
  }

  async onDateChange(event: any) {

    const studentDetails = await  this.storageService.getStudentDetails();

     if (studentDetails && Object.keys(studentDetails).length > 0) {
       console.log('event.detail.value:', event.detail.value);

        const formattedDate = this.trimDateTime(event.detail.value); // Formats to YYYY-MM-DD
      console.log('Formatted Selected Date:', formattedDate);

      this.hwService.getHomeworksForSubForDay(formattedDate, studentDetails.branchId, studentDetails.standardId).subscribe((data) => {
        console.log(data);
        this.homeworkList = data;
        this.uniqueSubjectIds = Array.from(new Set(this.homeworkList.map((homework: { subjectId: any; }) => homework.subjectId)));

        //  this.iterateSchoolHolidays(data);

      });
    }
    
  }

  async getTodaysHomework() {

    const studentDetails = await this.storageService.getStudentDetails();

    if (studentDetails && Object.keys(studentDetails).length > 0) {
 
 
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const dd = String(today.getDate()).padStart(2, '0');

      const formattedDate = `${yyyy}-${mm}-${dd}`;
      console.log(formattedDate); // e.g., "2025-07-27"

      console.log('Formatted Selected Date:', formattedDate);

      this.hwService.getHomeworksForSubForDay(formattedDate, studentDetails.branchId, studentDetails.standardId).subscribe((data) => {
        console.log(data);
        this.homeworkList = data;
        this.uniqueSubjectIds = Array.from(new Set(this.homeworkList.map((homework: { subjectId: any; }) => homework.subjectId)));

        //  this.iterateSchoolHolidays(data);

      });
    }

  }

}
