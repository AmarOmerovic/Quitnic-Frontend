import { Component, inject, OnInit } from '@angular/core';
import { UserSmokeHistoryService } from '../../shared/services/user-smoke-history/user-smoke-history.service';
import { UserSmokeHistoryRequest } from '../../shared/models/user-smoke-history';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personalization-screen',
  imports: [FormsModule, CommonModule],
  templateUrl: './personalization-screen.component.html',
  styleUrl: './personalization-screen.component.scss',
})
export class PersonalizationScreenComponent implements OnInit {
  smokeHistoryService = inject(UserSmokeHistoryService);
  route = inject(ActivatedRoute);

  userId = '';
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
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.fetchUserSmokeHistory();
    });
  }

  saveSmokeHistory() {
    this.userIdError();

    // Reset error message and set loading state
    this.errorMessage = '';
    this.isLoading = true;

    // Prepare the payload
    const updatedHistory: UserSmokeHistoryRequest = {
      ...this.formData,
      quitDate: new Date(this.formData.quitDate).toISOString(),
    };

    console.log(updatedHistory);

    // Call the service to update smoke history
    this.smokeHistoryService
      .updateSmokeHistory(this.userId, updatedHistory)
      .subscribe({
        next: (data) => {
          console.log('Updated Smoke History:', data);
          this.isLoading = false;
          alert('Your smoke history has been updated successfully!');
        },
        error: (error) => {
          console.error('Error updating smoke history:', error);
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
