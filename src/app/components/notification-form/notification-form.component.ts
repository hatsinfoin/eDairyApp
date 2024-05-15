 import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolNoticeBoard } from '../../dataDTO/schoolNoticeBoard.data'; // Adjust the path accordingly
import { ModalController } from '@ionic/angular';
import { NoticeBoardService } from '../../services/noticeBoard.service';
import { NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss'],
})
export class NotificationFormComponent  implements OnInit {
  
  noticeBoardForm: FormGroup;
   @Input() receivedData: any;

  constructor(private alertController: AlertController,private navParams: NavParams,private fb: FormBuilder, private modalCtrl: ModalController, private noticeBoardService: NoticeBoardService) {
    this.receivedData = this.navParams.get('data');
    console.log("this.receivedData ");
    console.log(this.receivedData );  
    this.noticeBoardForm = this.receivedData;
   }
 

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

    
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  
  createForm() {
    this.noticeBoardForm = this.fb.group({
      _id: [null],
      branchId: ['NLR001', Validators.required],
      id: ['', Validators.required],
      noticeDepartment: ['', Validators.required],
      noticeTitle: ['', Validators.required],
      noticeDetails: ['', Validators.required],
      noticeBy: ['', Validators.required],
      noticeStartDate: ['', Validators.required],
      noticeEndDate: ['', Validators.required],       
    });
  }

  editForm() {
    this.noticeBoardForm = this.fb.group({
      _id: [this.receivedData._id],
      id: [this.receivedData.id],
      branchId: [this.receivedData.branchId, Validators.required],
      noticeDepartment: [this.receivedData.noticeDepartment, Validators.required],
      noticeTitle: [this.receivedData.noticeTitle, Validators.required],
      noticeDetails: [this.receivedData.noticeDetails, Validators.required],
      noticeBy: [this.receivedData.noticeBy, Validators.required],
      noticeStartDate: [this.receivedData.noticeStartDate, Validators.required],
      noticeEndDate: [this.receivedData.noticeEndDate, Validators.required],      
    });
  }

  // Implement form submission logic here
  onSubmit() {
    if (this.noticeBoardForm.valid) {
      const formData: SchoolNoticeBoard = this.noticeBoardForm.value as SchoolNoticeBoard;
      this.noticeBoardService.saveSchoolNoticeBoard(formData).subscribe((data) => {      
        
        this.presentAlert("Successfuly Saved");
 
        this.cancel();
      }); 
 
    } else {
      console.log(this.noticeBoardForm.value);

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
