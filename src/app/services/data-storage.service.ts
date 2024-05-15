import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.storage.create();
  }
  // Save data to storage
  async setData(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  // Get data from storage
  async getData(key: string): Promise<any> {
    return await this.storage.get(key);
  }

  // Remove data from storage
  async removeData(key: string): Promise<void> {
    await this.storage.remove(key);
  }
}
