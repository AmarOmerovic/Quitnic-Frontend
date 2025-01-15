import { TestBed } from '@angular/core/testing';

import { AchievementService } from '../../../shared/services/achievement/achievement.service';

describe('AchievementServiceService', () => {
  let service: AchievementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AchievementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
