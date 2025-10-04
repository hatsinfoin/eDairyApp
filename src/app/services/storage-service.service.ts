import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SchoolStudentProfile } from 'src/app/dataDTO/schoolStudentPriofile.data'; 

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private isStorageInitialized = false;

  constructor(private storage: Storage) {
    this.init(); // Initialize storage when the service is created
  }

  // Initialize the storage
  async init() {
    try {
      await this.storage.create(); // Create the storage instance
      this.isStorageInitialized = true; // Set the flag to true if initialization is successful
    } catch (error) {
      console.error('Error creating storage:', error);
      this.isStorageInitialized = false; // Set the flag to false if initialization fails
    }
  }

  // Check if the database is initialized before performing operations
  private async checkIfStorageInitialized() {
    if (!this.isStorageInitialized) {
      throw new Error('Database not created. Must call create() first.');
    }
  }

  // Save user details in storage
  async saveUserDetails(user: any): Promise<void> {
    await this.checkIfStorageInitialized(); // Check if the database is initialized
    await this.storage.set('user', user); // Save user object to local storage
  }

  // Get user details from storage
  async getUserDetails(): Promise<any> {
    await this.checkIfStorageInitialized(); // Check if the database is initialized
    return await this.storage.get('user'); // Retrieve user object from storage
  }

  // Save user details in storage
  async saveStudentDetails(student: SchoolStudentProfile): Promise<void> {
    await this.checkIfStorageInitialized(); // Check if the database is initialized
    await this.storage.set('student', student); // Save user object to local storage
  }

  // Get user details from storage
  async getStudentDetails(): Promise<SchoolStudentProfile> {
    await this.checkIfStorageInitialized(); // Check if the database is initialized
    return await this.storage.get('student'); // Retrieve user object from storage
  }


  // Remove user details from storage
  async removeUserDetails(): Promise<void> {
    await this.checkIfStorageInitialized(); // Check if the database is initialized
    await this.storage.remove('user'); // Remove user object from storage
  }
}
