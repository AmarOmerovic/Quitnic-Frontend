import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AchievementService } from '../../shared/services/achievement/achievement.service';
import { ActivatedRoute } from '@angular/router';
import { UserAchievement } from '../../shared/models/user-achievement';

@Component({
  selector: 'app-achievements-screen',
  imports: [CommonModule],
  templateUrl: './achievements-screen.component.html',
  styleUrl: './achievements-screen.component.scss',
})
export class AchievementsScreenComponent implements OnInit {
  private achievementService = inject(AchievementService);
  private route = inject(ActivatedRoute);
  private userId = '';

  achievements: UserAchievement[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.fetchUserAchievements();
    });
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
