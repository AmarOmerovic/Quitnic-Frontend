import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';

@Component({
  selector: 'app-signin-screen',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin-screen.component.html',
  styleUrl: './signin-screen.component.scss',
})
export class SigninScreenComponent {
  router = inject(Router);
  supabaseService = inject(SupabaseService);

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  async login() {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.supabaseService
      .signIn(this.email, this.password)
      .subscribe((result) => {
        if (result.error) {
          this.errorMessage =
            result.error.message || 'An error occurred during sign-up.';
        } else {
          this.router.navigateByUrl('/');
        }
      });
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
