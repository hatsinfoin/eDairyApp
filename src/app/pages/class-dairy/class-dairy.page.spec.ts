import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassDairyPage } from './class-dairy.page';

describe('ClassDairyPage', () => {
  let component: ClassDairyPage;
  let fixture: ComponentFixture<ClassDairyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClassDairyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
