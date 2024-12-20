import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolStudentLeavePage } from './school-student-leave.page';

describe('SchoolStudentLeavePage', () => {
  let component: SchoolStudentLeavePage;
  let fixture: ComponentFixture<SchoolStudentLeavePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SchoolStudentLeavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
