import { TestBed } from '@angular/core/testing';

import { AppPropertiesService } from './app-properties.service';

describe('AppPropertiesService', () => {
  let service: AppPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
