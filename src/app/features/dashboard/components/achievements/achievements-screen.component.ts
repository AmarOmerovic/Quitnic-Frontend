import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserAchievementResponse } from '../../models/achievements/user-achievement';
import { AchievementService } from '../../services/achievements/achievement.service';

@Component({
  selector: 'app-achievements-screen',
  imports: [CommonModule],
  templateUrl: './achievements-screen.component.html',
  styleUrl: './achievements-screen.component.scss',
})
export class AchievementsScreenComponent implements OnInit {
  private achievementService = inject(AchievementService);
  private userId = '';

  achievements: UserAchievementResponse[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    this.fetchUserAchievements();
  }

  private fetchUserAchievements() {
    this.userIdError();

    this.isLoading = true;
    this.achievementService.fetchUserAchievements(this.userId).subscribe({
      next: (data) => {
        this.achievements = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching achievements:', error);
        this.errorMessage = 'Failed to load achievements.';
        this.isLoading = false;
      },
    });
  }

  private userIdError() {
    if (this.userId === '') {
      this.errorMessage = 'User ID is missing.';
      return;
    }
  }
}
