import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../shared/services/supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrl: './signup-screen.component.scss',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class SignupScreenComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreeToTerms: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

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

    try {
      const data = await this.supabaseService.signUp(this.email, this.password);
      this.successMessage =
        'Registration successful! Please check your email for confirmation.';
    } catch (error: any) {
      this.errorMessage = 'An error occurred during sign-up.';
    }
  }

  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }
}
