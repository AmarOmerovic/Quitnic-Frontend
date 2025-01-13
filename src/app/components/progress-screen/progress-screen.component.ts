import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSmokeHistoryService } from '../../shared/services/user-smoke-history/user-smoke-history.service';
import { UserSmokeHistoryResponse } from '../../shared/models/user-smoke-history';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-screen',
  imports: [CommonModule],
  templateUrl: './progress-screen.component.html',
  styleUrl: './progress-screen.component.scss',
})
export class ProgressScreenComponent implements OnInit {
  smokeHistoryService = inject(UserSmokeHistoryService);
  route = inject(ActivatedRoute);
  userId = '';

  isLoading = false; // To indicate loading state
  errorMessage = ''; // To store error messages
  daysSmokeFree = 0;
  moneySaved = 0;
  cigarettesAvoided = 0;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.fetchUserSmokeHistory();
    });
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
    console.log(this.cigarettesAvoided);
  }

  private userIdError() {
    if (this.userId === '') {
      this.errorMessage = 'User ID is missing.';
      return;
    }
  }
}
