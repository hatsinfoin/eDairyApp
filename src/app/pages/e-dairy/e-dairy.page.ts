import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../../services/storage-service.service';
import { EdairyService } from '../../services/edairy.service';
// import { EdairyFormComponent } from '../../components/edairy-form/edairy-form.component'; // Uncomment if modal is implemented
import { SchooleDairy } from 'src/app/dataDTO/schooleDairy.data';

@Component({
  selector: 'app-e-dairy',
  templateUrl: './e-dairy.page.html',
  styleUrls: ['./e-dairy.page.scss'],
})
export class EDairyPage implements OnInit {

  eDairyList: SchooleDairy[] = [];
  values: string[] = [];
  expandedItemId: string | null = null;

  constructor(
    private router: Router,
    private edairyService: EdairyService,
    private modalCtrl: ModalController,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.getAllEDairyDetails(); // Or call getAllEDairyByBranchId if needed
  }

  routePage(routePage: string) {
    if (routePage === 'landingPage') {
      this.router.navigate(['tab1']);
    }
  }

  accordionGroupChange(ev: any) {
    const collapsedItems = this.values.filter(value => value !== ev.detail.value);
    const selectedValue = ev.detail.value;

    console.log(
      `Expanded: ${selectedValue === undefined ? 'None' : selectedValue} | Collapsed: ${collapsedItems.join(', ')}`
    );
  }

  async openEDairyModal() {
    /*
    const modal = await this.modalCtrl.create({
      component: EdairyFormComponent
    });
    await modal.present();

    const { role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.getAllEDairyByBranchId();
    }
    */
  }

  async openEditEDairyModal(eDairyObj: SchooleDairy) {
    /*
    const modal = await this.modalCtrl.create({
      component: EdairyFormComponent,
      componentProps: { data: eDairyObj }
    });
    await modal.present();

    const { role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.getAllEDairyByBranchId();
    }
    */
  }

  async getAllEDairyByBranchId() {
    const studentDetails = await this.storageService.getStudentDetails();
    if (studentDetails?.branchId) {
      this.edairyService.getAllEDairyByBranchId(studentDetails.branchId).subscribe(data => {
        this.eDairyList = data;
        this.values = data.map(item => item.id ?? '');
        console.log('Fetched EDairy by Branch:', this.eDairyList);
      });
    }
  }

  async getAllEDairyDetails() {
    this.edairyService.getAllEDairy().subscribe(data => {
      this.eDairyList = data;
      this.values = data.map(item => item.id ?? '');
      console.log('All eDairy Entries:', this.eDairyList);
    });
  }

  deleteEDairy(eDairyId: string) {
    this.edairyService.deleteEDairy(eDairyId).subscribe(() => {
      this.getAllEDairyByBranchId(); // Or getAllEDairyDetails() if needed
    });
  }

  editEDairy(eDairy: SchooleDairy) {
    this.openEditEDairyModal(eDairy);
  }

  duplicateEDairy(eDairy: SchooleDairy) {
    /*
    const clone = { ...eDairy, id: null };
    this.openEditEDairyModal(clone);
    */
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  isExpanded(id: string): boolean {
    return this.expandedItemId === id;
  }
  toggleExpand(id: string) {
    this.expandedItemId = this.expandedItemId === id ? null : id;
  }
}
