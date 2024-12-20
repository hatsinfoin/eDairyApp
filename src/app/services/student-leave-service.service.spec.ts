import { TestBed } from '@angular/core/testing';

import { StudentLeaveServiceService } from './student-leave-service.service';

describe('StudentLeaveServiceService', () => {
  let service: StudentLeaveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentLeaveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
