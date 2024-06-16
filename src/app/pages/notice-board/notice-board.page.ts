import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeBoardService } from '../../services/noticeBoard.service';
import { SchoolNoticeBoard } from '../../dataDTO/schoolNoticeBoard.data';
import { CommunicaitonMessage } from '../../dataDTO/communicaitonMessage.data';
import { ModalController } from '@ionic/angular';
import { NotificationFormComponent } from '../../components/notification-form/notification-form.component';
import { CommunicaitonMessageService } from '../../services/communicaitonMessage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.page.html',
  styleUrls: ['./notice-board.page.scss'],
})
export class NoticeBoardPage implements OnInit {

  schoolNoticeBoardList: SchoolNoticeBoard[];
  communicaitonMessage: CommunicaitonMessage;
  message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(private router: Router, private noticeBoardService: NoticeBoardService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.reFetchAllNoticeBoard();
  }

  routePage(routePage: string) {
    if (routePage === "landingPage") {
      this.router.navigate(['tab1']);
    }
  }

  reFetchAllNoticeBoard() {
   
    this.noticeBoardService.getSchoolNoticeBoard().subscribe((data) => {
      console.log(data);

      this.schoolNoticeBoardList = data;
      //  this.iterateSchoolEvents(data);

    },
    (error: HttpErrorResponse) => {
      // Handle error response
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        alert('An error occurred:'+ error.error.message);
      } else {
        // Backend error
        alert(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`
        );
      }
  });
  }


  deleteSchoolEvent(schoolEventId: string) {

    this.noticeBoardService.deleteSchoolNoticeBoard(schoolEventId).subscribe((data) => {
      console.log(data);
      this.reFetchAllNoticeBoard();
    });
  }

  editSchoolNoticeBoard(schoolEventObj: SchoolNoticeBoard) {
    this.openEditEventModal(schoolEventObj);
  }

  duplicateSchoolNoticeBoard(schoolEventObj: SchoolNoticeBoard) {
    schoolEventObj._id = null;
    schoolEventObj.id = null;
    console.log("Duplicate");
    console.log(schoolEventObj);
    this.openEditEventModal(schoolEventObj);
  }

  async openEditEventModal(schoolEventObj: SchoolNoticeBoard) {
    const modal = await this.modalCtrl.create({
      component: NotificationFormComponent,
      componentProps: { data: schoolEventObj },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
    this.reFetchAllNoticeBoard();

  }


  async openEventModal() {
    const modal = await this.modalCtrl.create({
      component: NotificationFormComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
    this.reFetchAllNoticeBoard();

  }

  sendCommunicaitonMessage(schoolEventObj: string) {
    const communicationMessage = new CommunicaitonMessage();
    // Set the value using the setter
    communicationMessage.sendMessage = schoolEventObj;

    this.noticeBoardService.sendCommunicaitonMessage(communicationMessage).subscribe((data) => {
      console.log(data);
    });

   // this.noticeBoardService.sendCommunicaitonMessage(communicationMessage);
   }


}
