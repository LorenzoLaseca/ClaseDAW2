import { TestBed } from '@angular/core/testing';

import { ItemResponseService } from './item-response.service';

describe('ItemResponseService', () => {
  let service: ItemResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
