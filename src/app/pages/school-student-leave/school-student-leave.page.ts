import { Component, OnInit } from '@angular/core';
import { StudentLeaveServiceService } from '../../services/student-leave-service.service';
import { StudentLeaveData } from '../../dataDTO/studentLeave.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-student-leave',
  templateUrl: './school-student-leave.page.html',
  styleUrls: ['./school-student-leave.page.scss'],
})
export class SchoolStudentLeavePage implements OnInit {


  ngOnInit() {
    this.reFetchAllHomeworkList();
  }

  segment: string = 'leaveForm'; // default segment is leaveForm
  leaveForm: StudentLeaveData = new StudentLeaveData(
    '',         // leaveId
    '',         // academicYear
    '',         // standardId
    '',         // branchId
    '',         // leaveReason
    '',         // leaveBy
    'Casual',   // leaveType (default value)
    new Date().toISOString().split('T')[0],         // leaveStartDate
    this.getNextDayDate()  // leaveEndDate set to the next day in 'YYYY-MM-DD' format
  );

  // Sample leave history data
  stdleaveHistory: StudentLeaveData[];

  constructor(private stdLeaveService: StudentLeaveServiceService,
    private router: Router
  ) { }

  submitLeaveForm() {
    console.log('Leave Form Submitted', this.leaveForm);

    // Generate a unique id and leaveId
    const leaveId = 'L' + Math.floor(Math.random() * 1000); // Example: Generate random leaveId for demo
    const leaveBy = 'John Doe'; // This should be dynamic based on logged-in user (for now using a static name)
    const academicYear = '2023-2024'; // This can be dynamic based on the current year
    const standardId = '9'; // This can be dynamic if needed
    const branchId = 'B'; // This can be dynamic if needed

    // Create a new StudentLeaveData object using the constructor
    const newLeave = new StudentLeaveData(
      leaveId,             // leaveId
      academicYear,        // academicYear
      standardId,          // standardId
      branchId,            // branchId
      this.leaveForm.leaveReason, // leaveReason from form
      leaveBy,             // leaveBy (static for now, can be dynamic)
      this.leaveForm.leaveType, // leaveType from form
      this.leaveForm.leaveStartDate, // leaveStartDate from form
      this.leaveForm.leaveEndDate // leaveEndDate from form
    );

    // Add the new leave entry to the leave history
    this.stdleaveHistory.unshift(newLeave); // Adds the new leave entry at the start of the history list

    this.stdLeaveService.saveStudentLeave(this.leaveForm).subscribe((data) => {
      this.reFetchAllHomeworkList();
    });

    // Optionally, switch to the leave history segment after submission
    this.segment = 'leaveHistory';
  }

  reFetchAllHomeworkList() {
    this.stdLeaveService.getAllStudentLeave().subscribe((data) => {
      console.log(data);
      this.stdleaveHistory = data;
    });
  }

  // Function to get the next day's date in 'YYYY-MM-DD' format
  getNextDayDate(): string {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Add one day to current date
    return today.toISOString().split('T')[0]; // Return in 'YYYY-MM-DD' format
  }

  routePage(routePage: string) {
    if (routePage === "landingPage") {
      this.router.navigate(['tab1']);
    }
  }

}
