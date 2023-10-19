import { TestBed } from '@angular/core/testing';

import { CosmosDbApiService } from './cosmos-db-api.service';

describe('CosmosDbApiService', () => {
  let service: CosmosDbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosmosDbApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
