import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrl: './signup-screen.component.scss',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class SignupScreenComponent {
  router = inject(Router);
  supabaseService = inject(SupabaseService);
  userService = inject(UserService);

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreeToTerms: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  async register() {
    this.errorMessage = '';
    this.successMessage = '';

    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.agreeToTerms) {
      this.errorMessage = 'You must agree to the terms and conditions.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters.';
      return;
    }

    this.supabaseService
      .signUp(this.email, this.password)
      .subscribe((result) => {
        if (result.error) {
          this.errorMessage = 'An error occurred during sign-up.';
        } else {
          this.successMessage =
            'Registration successful! Please check your email for confirmation.';
        }
      });
  }

  navigateToSignIn() {
    this.router.navigate(['/signin'], { replaceUrl: true });
  }
}
