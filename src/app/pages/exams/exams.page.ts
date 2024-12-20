import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamsService } from '../../services/exams.service';
import { Exams } from 'src/app/dataDTO/ExamResultsModel.data';
import { ModalController } from '@ionic/angular';
import { EventsformComponent } from '../../components/eventsform/eventsform.component';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.page.html',
  styleUrls: ['./exams.page.scss'],
})
export class ExamsPage implements OnInit {

  constructor(private router: Router, private examsService: ExamsService, private modalCtrl: ModalController,
    private loadingCtrl: LoadingController) { }

  subjectFilter: string = '';  // Filter string for subjects
  standardList: string[] = [
    "LKG", "UKG", "FirstStandard", "SecondStandard", "ThirdStandard", "ForthStandard",
    "FifthStandard", "SixthStandard", "SeventhStandard", "EighthStandard", "NinethStandard",
    "TehnthStandard"
  ];

  examsList: string[] = ["FA-1", "FA-2", "FA-3", "FA-4", "SA-1", "SA-2"];

  isSelectDisabled: boolean = false; // Flag to disable the ion-select dynamically

  selectedStandard: string = ''; // To hold the selected standard value
  selectedExam: string = ''; // To hold the selected standard value

  // The loading instance will be created dynamically using LoadingController
  loading: HTMLIonLoadingElement;

  routePage(routePage: string) {
    if (routePage === "landingPage") {
      this.router.navigate(['tab1']);
    }
  }

  exams: Exams[];
  message = 'This modal example uses the modalController to present and dismiss modals.';

  ngOnInit() {
    this.reFetchAllEvents("NLR001", "FA-1", "LKG");
  }



  async reFetchAllEvents(branchId: string, examId: string, standardId: string) {
    await this.presentLoading(); // Show the loading spinner
    this.examsService.getStudentsbyBranchExamStnd(branchId, examId, standardId).subscribe((data) => {
      console.log(data);
      this.exams = data;
      // After the task completes, dismiss the loading spinner
      this.dismissLoading();
    });
  }


  // Method to show the loading spinner
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...', // The text that will be shown with the spinner
      spinner: 'crescent', // The type of spinner (you can use 'lines', 'crescent', etc.)
      //duration: 5000, // Optional: duration for which the loading will be shown
    });

    await this.loading.present(); // Show the loading spinner
  }

  // Method to hide the loading spinner
  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss(); // Dismiss the loading spinner
    }
  }

  // Filter subjects based on user input
  filterSubjects() {
    if (this.subjectFilter.trim() === '') {
      return this.exams; // Return all exams if the filter is empty
    } else {
      return this.exams.filter(exam =>
        exam.examResultsSujects.some(subject =>
          subject.subjectsId.toLowerCase().includes(this.subjectFilter.toLowerCase())
        )
      );
    }
  }

  // Additional function to apply filtering logic to subjects within each exam
  filteredSubjects(exam: Exams) {
    if (this.subjectFilter.trim() === '') {
      return exam.examResultsSujects;  // Return all subjects if the filter is empty
    } else {
      return exam.examResultsSujects.filter(subject =>
        subject.subjectsId.toLowerCase().includes(this.subjectFilter.toLowerCase())
      );
    }
  }


  // Method to handle change event
  onStandardChange(event: any) {
    console.log('Selected Standard:', event.detail.value);
    this.selectedStandard = event.detail.value;
    // Add any additional logic you want to perform when the selection changes
    this.reFetchAllEvents("NLR001", this.selectedExam, event.detail.value);
  }


  // Method to handle change event
  onExamChange(event: any) {
    console.log('Selected Standard:', event.detail.value);
    this.selectedExam = event.detail.value;
    // Add any additional logic you want to perform when the selection changes
    this.reFetchAllEvents("NLR001", this.selectedExam, this.selectedStandard);
  }


  // You can dynamically change this flag to disable or enable the ion-select
  disableSelect() {
    this.isSelectDisabled = true; // Disable the select
  }

  enableSelect() {
    this.isSelectDisabled = false; // Enable the select
  }

}
