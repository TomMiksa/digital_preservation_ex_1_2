import { TestBed, async, inject } from '@angular/core/testing';

import { GeneratedGuard } from './generated.guard';

describe('GeneratedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneratedGuard]
    });
  });

  it('should ...', inject([GeneratedGuard], (guard: GeneratedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
