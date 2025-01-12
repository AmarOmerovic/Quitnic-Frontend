import { TestBed } from '@angular/core/testing';
import { UserSmokeHistoryService } from './user-smoke-history.service';

describe('UserSmokeHistoryService', () => {
  let service: UserSmokeHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSmokeHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
