import { Achievement } from './achievement';

export interface UserAchievement {
  achievement: Achievement;
  isUnlocked: boolean;
  unlockedAt?: string;
}
