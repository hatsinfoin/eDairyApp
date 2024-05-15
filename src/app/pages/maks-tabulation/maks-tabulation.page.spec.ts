import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaksTabulationPage } from './maks-tabulation.page';

describe('MaksTabulationPage', () => {
  let component: MaksTabulationPage;
  let fixture: ComponentFixture<MaksTabulationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MaksTabulationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
