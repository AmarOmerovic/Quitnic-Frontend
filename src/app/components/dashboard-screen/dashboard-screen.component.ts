import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-survey-screen',
  imports: [RouterOutlet],
  templateUrl: './dashboard-screen.component.html',
  styleUrl: './dashboard-screen.component.scss',
  standalone: true,
})
export class DashboardScreenComponent {
  supabaseService = inject(SupabaseService);
  router = inject(Router);

  logout() {
    this.supabaseService.signOut();
  }
}
