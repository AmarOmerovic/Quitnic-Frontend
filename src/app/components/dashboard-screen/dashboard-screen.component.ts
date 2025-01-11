import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-screen',
  imports: [],
  templateUrl: './dashboard-screen.component.html',
  styleUrl: './dashboard-screen.component.scss',
  standalone: true,
})
export class SurveyScreenComponent {
  supabaseService = inject(SupabaseService);
  router = inject(Router);

  logout() {
    this.supabaseService.signOut();
  }
}
