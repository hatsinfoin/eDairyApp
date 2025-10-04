import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { Homework } from '../../dataDTO/schookHomework.data';
import { HomeworkServiceService } from '../../services/homework-service.service';
 

@Component({
  selector: 'app-home-work-form',
  templateUrl: './home-work-form.component.html',
  styleUrls: ['./home-work-form.component.scss'],
})

 

export class HomeWorkFormComponent implements OnInit {

  homeWorkForm: FormGroup;
  @Input() receivedData: any;

  constructor(
    private alertController: AlertController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private homeworkService: HomeworkServiceService
  ) {
    this.receivedData = this.navParams.get('data');
    console.log('this.receivedData ', this.receivedData);
    this.homeWorkForm = this.receivedData;
  }

  ngOnInit() {
    if (!this.receivedData) {
      this.createForm();
    } else {
      this.editForm();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.homeWorkForm.value, 'confirm');
  }

  createForm() {
    this.homeWorkForm = this.fb.group({
      id: [null],
      homeWorkId: ['', Validators.required],
      academicYear: ['', Validators.required],
      standardId: ['', Validators.required],
      branchId: ['NLR001', Validators.required],
      eDairyDetails: ['', Validators.required],
      subjectId: ['', Validators.required],
      dateOfAssignment: [new Date().toISOString(), Validators.required],

    });
  }

  editForm() {
    this.homeWorkForm = this.fb.group({
      id: [this.receivedData.id],
      homeWorkId: [this.receivedData.homeWorkId, Validators.required],
      academicYear: [this.receivedData.academicYear, Validators.required],
      standardId: [this.receivedData.standardId, Validators.required],
      branchId: [this.receivedData.branchId, Validators.required],
      eDairyDetails: [this.receivedData.eDairyDetails, Validators.required],
      subjectId: [this.receivedData.subjectId, Validators.required],
      dateOfAssignment: [this.receivedData.dateOfAssignment, Validators.required],
    });
  }

  trimDateTime(dateTimeStr: string): string {
  if (!dateTimeStr) return '';
  const index = dateTimeStr.indexOf('T');
  return index !== -1 ? dateTimeStr.substring(0, index) : dateTimeStr;
}

  onSubmit() {
    if (this.homeWorkForm.valid) {
 
      const formData: Homework = { ...this.homeWorkForm.value };

      // Format the date to 'YYYY-MM-DD'
      if (formData.dateOfAssignment) {
        formData.dateOfAssignment = this.trimDateTime(formData.dateOfAssignment);
      }
    
      console.log(formData); 

      this.homeworkService.saveHomework(formData).subscribe({
        next: () => {
          this.presentAlert('Successfully Saved');
          this.cancel();
        },
        error: (err) => {
          console.error(err);
          this.presentAlert('Failed to save homework.');
        },
      });
    } else {
      console.log(this.homeWorkForm.value);
    }
  }

  onDelete() {
    if (this.receivedData && this.receivedData.homeWorkId) {
      this.homeworkService.deleteHomeWork(this.receivedData.homeWorkId).subscribe({
        next: () => {
          this.presentAlert('Homework deleted successfully');
          this.cancel();
        },
        error: (err) => {
          console.error(err);
          this.presentAlert('Failed to delete homework.');
        },
      });
    }
  }

  async presentAlert(alertMessage: string) {
    const alert = await this.alertController.create({
      header: 'Homework',
      message: alertMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
