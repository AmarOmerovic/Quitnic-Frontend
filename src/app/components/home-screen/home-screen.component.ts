import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSmokeHistoryService } from '../../shared/services/user-smoke-history/user-smoke-history.service';

@Component({
  selector: 'app-home-screen',
  imports: [CommonModule],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
})
export class HomeScreenComponent implements OnInit {
  smokeHistoryService = inject(UserSmokeHistoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userId = '';

  isLoading = true;
  errorMessage = '';
  showPersonalization = false;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.fetchUserSmokeHistory();
    });
  }

  navigateTo(page: string): void {
    this.router.navigateByUrl(`/${page}`);
  }

  private fetchUserSmokeHistory() {
    this.userIdError();

    this.smokeHistoryService.fetchSmokeHistory(this.userId).subscribe({
      next: () => {
        console.log('Next');
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error');
        console.error('Error fetching smoke history:', error);
        this.isLoading = false;
        this.showPersonalization = true;
      },
    });
  }

  private userIdError() {
    if (this.userId === '') {
      this.errorMessage = 'User ID is missing.';
      this.isLoading = false;
      return;
    }
  }
}
