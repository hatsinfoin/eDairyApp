 import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolHolidays } from '../../dataDTO/schoolHolidays.data'; // Adjust the path accordingly
import { ModalController } from '@ionic/angular';
import { FormArray } from '@angular/forms';
import { HolidaysService } from '../../services/holidays.service';
import { NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss'],
})
export class HolidayFormComponent  implements OnInit {
  schoolHolidayForm: FormGroup;
  @Input() receivedData: any;

  constructor(private alertController: AlertController,private navParams: NavParams,private fb: FormBuilder, private modalCtrl: ModalController, private holidaysService: HolidaysService) { 
    this.receivedData = this.navParams.get('data');
    console.log("this.receivedData ");
    console.log(this.receivedData );  
    this.schoolHolidayForm = this.receivedData;
    //this.editForm();
  }

  name: string;
  ngOnInit() {

    //this.createForm();
    //alert(this.receivedData);
   // this.receivedData?.this.editForm() ?? this.createForm();

    if (this.receivedData === null || this.receivedData === undefined) {
      // If receivedData is null or undefined, call create logic
      this.createForm();
    } else {
      // If receivedData is not null, call edit logic
      this.editForm();
    }

    
   // this.editForm();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
   // this.onSubmit();
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }


  createForm() {
    this.schoolHolidayForm = this.fb.group({

      // _id:String| null;
      // holidayTitle:String;
      // branchId:String;
      // holidayStartDate:String;
      // holidayEndDate:String;
      // holidayDiscription:String;
      
      _id: [null],
      branchId: ['NLR001', Validators.required],
      holidayTitle: ['', Validators.required],
      holidayStartDate: ['', Validators.required],
      holidayEndDate: ['', Validators.required],
      holidayDiscription: ['', Validators.required],     
    });
  }

  editForm() {
    this.schoolHolidayForm = this.fb.group({
      _id: [this.receivedData._id],
      branchId: [this.receivedData.branchId, Validators.required],
      holidayTitle: [this.receivedData.holidayTitle, Validators.required],
      holidayStartDate: [this.receivedData.holidayStartDate, Validators.required],
      holidayEndDate: [this.receivedData.holidayEndDate, Validators.required],
      holidayDiscription: [this.receivedData.holidayDiscription, Validators.required],      
    });
  }

  // Implement form submission logic here
  onSubmit() {
    if (this.schoolHolidayForm.valid) {
      const formData: SchoolHolidays = this.schoolHolidayForm.value as SchoolHolidays;
      this.holidaysService.saveSchoolHolidays(formData).subscribe((data) => {      
        
        this.presentAlert("Successfuly Saved");
 
        this.cancel();
      });
 
    } else {
      console.log(this.schoolHolidayForm.value);

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

}
