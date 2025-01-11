import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';
import { catchError, of, tap } from 'rxjs';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-splash-screen',
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss',
  standalone: true,
})
export class SplashScreenComponent implements OnInit {
  router = inject(Router);
  userService = inject(UserService);
  supabaseService = inject(SupabaseService);

  ngOnInit(): void {
    setTimeout(() => {
      this.checkSessionAndNavigate();
    }, 2000);
  }

  private checkSessionAndNavigate() {
    this.supabaseService
      .getSession()
      .pipe(
        tap((session) => {
          if (session) {
            const supabaseUserId = session.user?.id;
            this.fetchUserFromBackend(supabaseUserId);
          } else {
            console.log('Sessions fail');
            this.router.navigateByUrl('/onboarding');
          }
        }),
        catchError(() => {
          this.router.navigateByUrl('/onboarding');
          return of(null);
        })
      )
      .subscribe();
  }

  private fetchUserFromBackend(userId: string) {
    this.userService.fetchUserWithId(userId).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: () =>
        this.supabaseService.signOut().subscribe({
          next: () => this.router.navigateByUrl('/onboarding'),
        }),
    });
  }
}
