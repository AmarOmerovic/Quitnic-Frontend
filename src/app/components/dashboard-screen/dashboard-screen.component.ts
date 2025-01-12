import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-survey-screen',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './dashboard-screen.component.html',
  styleUrl: './dashboard-screen.component.scss',
  standalone: true,
})
export class DashboardScreenComponent implements OnInit {
  supabaseService = inject(SupabaseService);
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userId = '';

  logout() {
    this.supabaseService.signOut();
  }

  ngOnInit(): void {
    this.fetchSuperbaseSession();
  }

  private fetchSuperbaseSession() {
    this.supabaseService
      .getSession()
      .pipe(
        tap((session) => {
          if (session) {
            const supabaseUserId = session.user?.id;
            this.fetchUserFromBackend(supabaseUserId);
          } else {
            this.router.navigateByUrl('');
          }
        })
      )
      .subscribe();
  }

  private fetchUserFromBackend(userId: string) {
    this.userService.fetchUserWithId(userId).subscribe({
      next: (user) => {
        this.userId = user.id;
        this.redirectToDefaultRoute();
      },
      error: () =>
        this.supabaseService.signOut().subscribe({
          next: () => this.router.navigateByUrl(''),
        }),
    });
  }

  private redirectToDefaultRoute(): void {
    if (this.userId) {
      this.router.navigate(['/dashboard/home'], {
        queryParams: { userId: this.userId },
      });
    }
  }
}
