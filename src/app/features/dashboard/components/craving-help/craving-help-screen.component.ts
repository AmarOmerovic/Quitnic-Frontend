import { Component, inject, OnInit } from '@angular/core';
import { UserSmokeHistoryService } from '../../services/user-smoke-history/user-smoke-history.service';
import { UserSmokeHistoryResponse } from '../../models/user-smoke-history/user-smoke-history';
import { CommonModule } from '@angular/common';
import { MotivationTipService } from '../../services/craving-help/motivation-tip-service.service';
import { MotivationTipResponse } from '../../models/craving-help/motivation-tip';

@Component({
  selector: 'app-craving-help-screen',
  imports: [CommonModule],
  templateUrl: './craving-help-screen.component.html',
  styleUrl: './craving-help-screen.component.scss',
})
export class CravingHelpScreenComponent implements OnInit {
  private motivationTipService = inject(MotivationTipService);
  private smokeHistoryService = inject(UserSmokeHistoryService);
  private motivationTips: MotivationTipResponse[] = [];
  private userId = '';

  isLoading = false;
  errorMessage = '';
  currentTip = '';
  daysSmokeFree = 0;
  moneySaved = 0;
  quitReason = '';

  timerDisplay = '00:10:00.000';
  timer: any;
  timerMilliseconds = 600000;

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    this.fetchMotivationTips();
  }

  getNewTip() {
    const randomIndex = Math.floor(Math.random() * this.motivationTips.length);
    this.currentTip = this.motivationTips[randomIndex].tip;
  }

  startTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.timerMilliseconds > 0) {
        this.timerMilliseconds -= 10;
        const minutes = Math.floor(this.timerMilliseconds / 60000);
        const seconds = Math.floor((this.timerMilliseconds % 60000) / 1000);
        const milliseconds = this.timerMilliseconds % 1000;
        this.timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
      } else {
        clearInterval(this.timer);
        this.timer = null;
        this.timerDisplay = '00:00:00.000';
      }
    }, 10);
  }

  resetTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timerMilliseconds = 600000;
    this.timerDisplay = '00:10:00.000';
  }

  private fetchMotivationTips() {
    this.isLoading = true;

    this.motivationTipService.fetchMotivationTips().subscribe({
      next: (tips) => {
        this.motivationTips = tips;
        this.currentTip = this.motivationTips[0].tip;
        this.fetchUserSmokeHistory();
      },
      error: (error) => {
        console.error('Error fetching motivation tips:', error);
        this.errorMessage =
          'Failed to load motivation tips. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  private fetchUserSmokeHistory() {
    this.userIdError();

    this.smokeHistoryService.fetchSmokeHistory(this.userId).subscribe({
      next: (response) => {
        this.calculateData(response);
      },
      error: (error) => {
        console.error('Error fetching smoke history:', error);
        this.errorMessage =
          'Failed to load motivation tips. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  private calculateData(response: UserSmokeHistoryResponse) {
    const quitDate = new Date(response.quitDate);
    const currentDate = new Date();

    this.daysSmokeFree = Math.floor(
      (currentDate.getTime() - quitDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    this.moneySaved = Math.floor(
      this.daysSmokeFree * response.costPerPack * response.packsPerDay
    );

    this.quitReason = response.reasonForQuitting;

    this.isLoading = false;
  }

  private userIdError() {
    if (this.userId === '') {
      this.errorMessage = 'User ID is missing.';
      return;
    }
  }
}
