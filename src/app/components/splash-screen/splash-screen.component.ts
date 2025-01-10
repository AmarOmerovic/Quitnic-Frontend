import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-splash-screen',
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss',
  standalone: true,
})
export class SplashScreenComponent implements OnInit {
  router = inject(Router);
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
            this.router.navigateByUrl('/survey');
          } else {
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
}
