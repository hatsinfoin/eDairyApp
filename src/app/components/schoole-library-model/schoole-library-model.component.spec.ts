import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchooleLibraryModelComponent } from './schoole-library-model.component';

describe('SchooleLibraryModelComponent', () => {
  let component: SchooleLibraryModelComponent;
  let fixture: ComponentFixture<SchooleLibraryModelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchooleLibraryModelComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchooleLibraryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
