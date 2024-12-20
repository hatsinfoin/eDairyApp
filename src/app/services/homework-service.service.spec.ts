import { TestBed } from '@angular/core/testing';

import { HomeworkServiceService } from './homework-service.service';

describe('HomeworkServiceService', () => {
  let service: HomeworkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeworkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
