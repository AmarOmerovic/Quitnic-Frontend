import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserSmokeHistoryRequest } from '../../models/user-smoke-history/user-smoke-history';
import { UserSmokeHistoryService } from '../../services/user-smoke-history/user-smoke-history.service';

@Component({
  selector: 'app-personalization-screen',
  imports: [FormsModule, CommonModule],
  templateUrl: './personalization-screen.component.html',
  styleUrl: './personalization-screen.component.scss',
})
export class PersonalizationScreenComponent implements OnInit {
  private smokeHistoryService = inject(UserSmokeHistoryService);
  private userId = '';

  formData: UserSmokeHistoryRequest = {
    quitDate: '',
    costPerPack: 0,
    reasonForQuitting: '',
    packsPerDay: 0,
    cigarettesPerPack: 0,
  };
  errorMessage: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.fetchUserSmokeHistory();
  }

  saveSmokeHistory() {
    this.userIdError();

    this.errorMessage = '';
    this.isLoading = true;

    const updatedHistory: UserSmokeHistoryRequest = {
      ...this.formData,
      quitDate: new Date(this.formData.quitDate).toISOString(),
    };

    this.smokeHistoryService
      .updateSmokeHistory(this.userId, updatedHistory)
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          alert('Your smoke history has been updated successfully!');
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage =
            'Failed to update smoke history. Please try again.';
        },
      });
  }

  private userIdError() {
    if (this.userId === '') {
      this.errorMessage = 'User ID is missing.';
      return;
    }
  }

  private fetchUserSmokeHistory() {
    this.userIdError();

    this.isLoading = true;
    this.smokeHistoryService.fetchSmokeHistory(this.userId).subscribe({
      next: (response) => {
        this.prefillFormData(response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching smoke history:', error);
        this.isLoading = false;
      },
    });
  }

  private prefillFormData(response: UserSmokeHistoryRequest) {
    this.formData = {
      quitDate: new Date(response.quitDate).toISOString().split('T')[0],
      costPerPack: response.costPerPack,
      reasonForQuitting: response.reasonForQuitting,
      packsPerDay: response.packsPerDay,
      cigarettesPerPack: response.cigarettesPerPack,
    };
  }
}
