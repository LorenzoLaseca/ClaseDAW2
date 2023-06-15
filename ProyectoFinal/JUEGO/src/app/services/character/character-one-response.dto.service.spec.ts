import { TestBed } from '@angular/core/testing';

import { CharacterOneResponseService } from './character-one-response.dto.service';

describe('CharacterOneResponseDtoService', () => {
  let service: CharacterOneResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterOneResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
