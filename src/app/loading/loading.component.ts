import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) { }

  // Show the loading spinner
  async presentLoading(message: string = 'Please wait...') {
    // Prevent multiple spinners
    if (this.loading) return;

    this.loading = await this.loadingController.create({
      message,
      spinner: 'circles',
      translucent: true,
      backdropDismiss: false,
      keyboardClose: true, // ✅ Auto close keyboard when loading opens
    });

    await this.loading.present();
  }

  // Hide the loading spinner
  async dismissLoading() {
    try {
      if (this.loading) {
        const top = await this.loadingController.getTop();
        if (top && top === this.loading) {
          await this.loading.dismiss();
        }
        this.loading = null; // ✅ Clear after dismiss
      }
    } catch (err) {
      console.error('Error dismissing loading:', err);
    }
  }
}
