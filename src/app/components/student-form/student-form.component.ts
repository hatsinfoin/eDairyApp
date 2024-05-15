import { Component, OnInit,Input } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { FormArray } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentProfileService } from '../../services/student.service';
import { SchoolStudentProfile } from 'src/app/dataDTO/schoolStudentPriofile.data';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent  implements OnInit {

  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder,
    private studnetService : StudentProfileService,
    private alertController: AlertController) { }

  ngOnInit() {
    if (this.receivedData === null || this.receivedData === undefined) {
      // If receivedData is null or undefined, call create logic 
      this.createForm();
    } else {
      // If receivedData is not null, call edit logic 
      this.editForm();
    }  

  }
  name: string;
  schoolStudentForm: FormGroup;
  @Input() receivedData: any;
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
   // this.onSubmit();
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }


  createForm() {
    this.schoolStudentForm = this.fb.group({
      _id: [null],
      branchId: ['NLR001', Validators.required],
      stRollNo: ['', Validators.required],
      stNaame: ['', Validators.required],
      stDateofBirth: ['', Validators.required],
      stAddres1: ['', Validators.required],
      stAddres2: ['', Validators.required],
      stPhoneNumber: ['', Validators.required],
      stMotherName: ['', Validators.required],
      stFatherName: ['', Validators.required],
      stGender: ['', Validators.required],
      stPincode: ['', Validators.required],
      stEmergencyContNumber: ['', Validators.required],
      gardian: ['', Validators.required],
      standardId: ['', Validators.required],
      profilePic: [''],
    });
  }

  editForm() {
    this.schoolStudentForm = this.fb.group({
      _id: [this.receivedData._id],
      branchId: [this.receivedData.branchId, Validators.required],
      stRollNo: [this.receivedData.stRollNo, Validators.required],
      stNaame: [this.receivedData.stNaame, Validators.required],
      stDateofBirth: [this.receivedData.stDateofBirth, Validators.required],
      stAddres1: [this.receivedData.stAddres1, Validators.required],
      stAddres2: [this.receivedData.stAddres2, Validators.required],
      stPhoneNumber: [this.receivedData.stPhoneNumber, Validators.required],
      stMotherName: [this.receivedData.stMotherName, Validators.required],
      stFatherName: [this.receivedData.stFatherName, Validators.required],
      stGender: [this.receivedData.stGender, Validators.required],
      stPincode: [this.receivedData.stPincode, Validators.required],
      stEmergencyContNumber: [this.receivedData.stEmergencyContNumber, Validators.required],
      gardian: [this.receivedData.gardian, Validators.required],
      standardId: [this.receivedData.standardId, Validators.required],
      profilePic: [this.receivedData.profilePic],
    });
  }

  // Implement form submission logic here
  async onSubmit() {
    if (this.schoolStudentForm.valid) {
      const formData: SchoolStudentProfile = this.schoolStudentForm.value as SchoolStudentProfile;
      await this.studnetService.saveSchoolStudentProfile(formData).subscribe((data) => {      
        
        this.presentAlert("Successfuly Saved");
 
        this.cancel();
      });
 
    } else {
      console.log(this.schoolStudentForm.value);

    }
  }


  async presentAlert(alertMessage:string) {
    const alert = await this.alertController.create({
      header: 'Notification',
      //subHeader: 'A Sub Header Is Optional',
      message: alertMessage,
      buttons: ['Action'],
    });

    await alert.present();
  }

   files:any ;

  handleFileInput(event: any) {
    const files = event.target.files;
    this.files = event.target.files;

    // Handle selected files
  }
  async uploadImages() {
   const a = await this.studnetService.uploadStudentProfile(this.files).subscribe((data) => {
      this.presentAlert("Successfuly Saved");
     // this.cancel();
    });
  }
}
