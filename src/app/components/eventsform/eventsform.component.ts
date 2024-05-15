import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolEvents } from '../../dataDTO/schoolEvents.data'; // Adjust the path accordingly
import { ModalController } from '@ionic/angular';
import { FormArray } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-eventsform',
  templateUrl: './eventsform.component.html',
  styleUrls: ['./eventsform.component.scss'],
})
export class EventsformComponent implements OnInit {
  schoolEventsForm: FormGroup;
   @Input() receivedData: any;

  constructor(private alertController: AlertController,private navParams: NavParams,private fb: FormBuilder, private modalCtrl: ModalController, private eventsService: EventsService) { 
    this.receivedData = this.navParams.get('data');
    console.log("this.receivedData ");
    console.log(this.receivedData );  
    this.schoolEventsForm = this.receivedData;
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

  createForm() {
    this.schoolEventsForm = this.fb.group({
      _id: [null],
      branchId: ['NLR001', Validators.required],
      eventName: ['', Validators.required],
      eventId: ['', Validators.required],
      eventType: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventLevel: ['', Validators.required],
      eventInitiatedBy: ['', Validators.required],
      eventOrganizedBy: ['', Validators.required],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventStatus: ['', Validators.required],
    });
  }

  editForm() {
    this.schoolEventsForm = this.fb.group({
      _id: [this.receivedData._id],
      branchId: [this.receivedData.branchId, Validators.required],
      eventName: [this.receivedData.eventName, Validators.required],
      eventId: [this.receivedData.eventId, Validators.required],
      eventType: [this.receivedData.eventType, Validators.required],
      eventDescription: [this.receivedData.eventDescription, Validators.required],
      eventLevel: [this.receivedData.eventLevel, Validators.required],
      eventInitiatedBy: [this.receivedData.eventInitiatedBy, Validators.required],
      eventOrganizedBy: [this.receivedData.eventOrganizedBy, Validators.required],
      eventStartDate: [this.receivedData.eventStartDate, Validators.required],
      eventEndDate: [this.receivedData.eventEndDate, Validators.required],
      eventStatus: [this.receivedData.eventStatus, Validators.required],
    });
  }

  // Implement form submission logic here
  onSubmit() {
    if (this.schoolEventsForm.valid) {
      const formData: SchoolEvents = this.schoolEventsForm.value as SchoolEvents;
      this.eventsService.saveSchoolEvents(formData).subscribe((data) => {      
        
        this.presentAlert("Successfuly Saved");
 
        this.cancel();
      });
 
    } else {
      console.log(this.schoolEventsForm.value);

    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.onSubmit();
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }


  get productImageControls() {
    return (this.schoolEventsForm.get('productImage') as FormArray).controls;
  }

  addImageInput() {
    (this.schoolEventsForm.get('productImage') as FormArray).push(this.fb.control(''));
  }

  removeImageInput(index: number) {
    (this.schoolEventsForm.get('productImage') as FormArray).removeAt(index);
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
