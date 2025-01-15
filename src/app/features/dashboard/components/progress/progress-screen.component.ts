import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSmokeHistoryService } from '../../services/user-smoke-history/user-smoke-history.service';
import { UserSmokeHistoryResponse } from '../../models/user-smoke-history/user-smoke-history';

@Component({
  selector: 'app-progress-screen',
  imports: [CommonModule],
  templateUrl: './progress-screen.component.html',
  styleUrl: './progress-screen.component.scss',
})
export class ProgressScreenComponent implements OnInit {
  private smokeHistoryService = inject(UserSmokeHistoryService);
  private userId = '';

  isLoading = false;
  errorMessage = '';
  daysSmokeFree = 0;
  moneySaved = 0;
  cigarettesAvoided = 0;

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    this.fetchUserSmokeHistory();
  }

  private fetchUserSmokeHistory() {
    this.userIdError();

    this.isLoading = true;
    this.smokeHistoryService.fetchSmokeHistory(this.userId).subscribe({
      next: (response) => {
        this.calculateProgress(response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching smoke history:', error);
        this.errorMessage =
          'Make sure to fill out the form in the "Personalization" section as it is essential to unlock the full potential of Quitnic and tailor the app to your unique quitting journey.';
        this.isLoading = false;
      },
    });
  }

  private calculateProgress(response: UserSmokeHistoryResponse) {
    const quitDate = new Date(response.quitDate);
    const currentDate = new Date();

    this.daysSmokeFree = Math.floor(
      (currentDate.getTime() - quitDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    this.moneySaved = Math.floor(
      this.daysSmokeFree * response.costPerPack * response.packsPerDay
    );

    this.cigarettesAvoided = this.daysSmokeFree * response.cigarettesPerDay;
  }

  private userIdError() {
    if (this.userId === '') {
      this.errorMessage = 'User ID is missing.';
      return;
    }
  }
}
