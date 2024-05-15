import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchooleLibraryPage } from './schoole-library.page';

describe('SchooleLibraryPage', () => {
  let component: SchooleLibraryPage;
  let fixture: ComponentFixture<SchooleLibraryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SchooleLibraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
