import { TestBed } from '@angular/core/testing';

import { AppContactsService } from './app-contacts.service';

describe('AppContactsService', () => {
  let service: AppContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
