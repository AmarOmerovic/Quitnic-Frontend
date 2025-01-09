import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';

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
      this.router.navigate(['/onboarding'], { replaceUrl: true });
    }, 3000);
  }
}
