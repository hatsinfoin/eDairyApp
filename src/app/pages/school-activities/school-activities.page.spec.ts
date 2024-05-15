import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolActivitiesPage } from './school-activities.page';

describe('SchoolActivitiesPage', () => {
  let component: SchoolActivitiesPage;
  let fixture: ComponentFixture<SchoolActivitiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SchoolActivitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
