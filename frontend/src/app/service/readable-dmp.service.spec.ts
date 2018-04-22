import { TestBed, inject } from '@angular/core/testing';

import { ReadableDmpService } from './readable-dmp.service';

describe('ReadableDmpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadableDmpService]
    });
  });

  it('should be created', inject([ReadableDmpService], (service: ReadableDmpService) => {
    expect(service).toBeTruthy();
  }));
});
