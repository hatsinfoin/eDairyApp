import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticeBoardPage } from './notice-board.page';

describe('NoticeBoardPage', () => {
  let component: NoticeBoardPage;
  let fixture: ComponentFixture<NoticeBoardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoticeBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
