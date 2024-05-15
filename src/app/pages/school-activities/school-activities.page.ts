import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivitiesService } from '../../services/activities.service';
import { SchoolActivities } from '../../dataDTO/schoolActivities.data';

@Component({
  selector: 'app-school-activities',
  templateUrl: './school-activities.page.html',
  styleUrls: ['./school-activities.page.scss'],
})
export class SchoolActivitiesPage implements OnInit {

  constructor(private router: Router,
              private activitiesService:ActivitiesService ) { }

  schoolActivitiesList: SchoolActivities[];
  
  ngOnInit() {
    this.reFetchAllActivities();
  }

  routePage(routePage: string) {
    if (routePage === "landingPage") {
      this.router.navigate(['tab1']);
    }
  }

  reFetchAllActivities(){

    
    this.activitiesService.getSchoolActivities().subscribe((data) => {
      console.log(data);

      this.schoolActivitiesList = data;
      //  this.iterateSchoolEvents(data);

    });

  }
}
