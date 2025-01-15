import { AchievementResponse } from './achievement';

export interface UserAchievementResponse {
  achievement: AchievementResponse;
  isUnlocked: boolean;
  unlockedAt?: string;
}
