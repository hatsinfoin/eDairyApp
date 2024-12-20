import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  private loading: any;

  constructor(private loadingController: LoadingController) { }

  // Show the loading spinner
  async presentLoading(message: string = 'Please wait...') {
    this.loading = await this.loadingController.create({
      message,
      spinner: 'circles',  // Customize the spinner type
      translucent: true,
      backdropDismiss: false,  // Don't dismiss when clicking outside
    });
    await this.loading.present();
  }

  // Hide the loading spinner
  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}
