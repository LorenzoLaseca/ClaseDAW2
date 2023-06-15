import { TestBed } from '@angular/core/testing';

import { MonsterResponseService } from './monster-response.service';

describe('MonsterResponseService', () => {
  let service: MonsterResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonsterResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
