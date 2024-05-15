import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EDairyPage } from './e-dairy.page';

describe('EDairyPage', () => {
  let component: EDairyPage;
  let fixture: ComponentFixture<EDairyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EDairyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
