import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { SupabaseService } from '../../../../core/services/supabase/supabase.service';

@Component({
  selector: 'app-splash-screen',
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss',
  standalone: true,
})
export class SplashScreenComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private supabaseService = inject(SupabaseService);

  ngOnInit(): void {
    setTimeout(() => {
      const session = this.supabaseService.getSessionSync();

      if (session) {
        const supabaseUserId = session.user?.id;
        this.fetchUserFromBackend(supabaseUserId);
      } else {
        this.router.navigateByUrl('/onboarding');
      }
    }, 2000);
  }

  private fetchUserFromBackend(userId: string) {
    this.userService.fetchUserWithId(userId).subscribe({
      next: (data) => {
        localStorage.setItem('userId', userId);
        localStorage.setItem('fullName', `${data.firstName} ${data.lastName}`);
        this.router.navigateByUrl('/dashboard');
      },
      error: () =>
        this.supabaseService.signOut().subscribe({
          error: (error) => console.error('Error during sign out:', error),
        }),
    });
  }
}
