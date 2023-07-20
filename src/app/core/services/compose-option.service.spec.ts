import { TestBed } from '@angular/core/testing';

import { ComposeOptionService } from './compose-option.service';

describe('ComposeOptionService', () => {
  let service: ComposeOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComposeOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
