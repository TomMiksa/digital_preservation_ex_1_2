import { TestBed, inject } from '@angular/core/testing';

import { AdministrativeDataService } from './administrative-data.service';

describe('AdministrativeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrativeDataService]
    });
  });

  it('should be created', inject([AdministrativeDataService], (service: AdministrativeDataService) => {
    expect(service).toBeTruthy();
  }));
});
