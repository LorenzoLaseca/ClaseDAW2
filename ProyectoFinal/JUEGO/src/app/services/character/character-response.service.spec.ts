import { TestBed } from '@angular/core/testing';

import { CharacterResponseService } from './character-response.service';

describe('CharacterResponseService', () => {
  let service: CharacterResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
