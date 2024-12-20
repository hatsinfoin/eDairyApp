import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeworkServiceService } from '../../services/homework-service.service';


@Component({
  selector: 'app-home-work',
  templateUrl: './home-work.page.html',
  styleUrls: ['./home-work.page.scss'],
})
export class HomeWorkPage implements OnInit {

  homeworkList: any;
  uniqueSubjectIds: string[];
  selectedDate: string;

  // Variable to hold the selected subjectId
  selectedSubject: string = '';


  constructor(private router: Router,
    private hwService: HomeworkServiceService
  ) {

    // Initialize selectedDate with the current date
    this.selectedDate = new Date().toISOString(); // Sets the current date as default

  }

  ngOnInit() {
    this.reFetchAllHomeworkList();

  }

  // Filter homework list based on the selected subjectId
  filteredHomeworkList() {

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

  onDateChange(event: any) {
    const date = new Date(event.detail.value);
    const formattedDate = date.toISOString().split('T')[0]; // Formats to YYYY-MM-DD
    console.log('Formatted Selected Date:', formattedDate);
  }

}
