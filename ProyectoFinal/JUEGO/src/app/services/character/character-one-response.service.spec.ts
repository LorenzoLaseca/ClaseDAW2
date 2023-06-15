import { TestBed } from '@angular/core/testing';

import { CharacterOneResponseService } from './character-one-response.service';

describe('CharacterOneResponeService', () => {
  let service: CharacterOneResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterOneResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
