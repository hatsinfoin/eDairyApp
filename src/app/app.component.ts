import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage-service.service'; // Adjust import path accordingly

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storageService: StorageService) { }

  // Call init during app initialization
  async ngOnInit() {
    await this.storageService.init();  // Initialize the storage
  }

}
