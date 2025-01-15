import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SupabaseService } from '../../../../core/services/supabase/supabase.service';

@Component({
  selector: 'app-survey-screen',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './dashboard-screen.component.html',
  styleUrl: './dashboard-screen.component.scss',
  standalone: true,
})
export class DashboardScreenComponent implements OnInit {
  private supabaseService = inject(SupabaseService);
  fullName = '';

  ngOnInit() {
    this.fullName = localStorage.getItem('fullName') || '';
  }

  logout() {
    this.supabaseService.signOut().subscribe({
      error: (error) => console.error('Error during sign out:', error),
    });
  }
}
