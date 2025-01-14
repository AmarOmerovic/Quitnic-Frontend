import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';
import { UserService } from '../../shared/services/user/user.service';
import { UserRequest } from '../../shared/models/user';
import { concatMap } from 'rxjs';

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
  isLoading = false;

  navigateToSignIn() {
    this.router.navigateByUrl('/signin');
  }

  navigateToTermsAndConditions() {
    this.router.navigateByUrl('/terms-and-conditions');
  }

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    const validationError = this.validateInput();
    if (validationError) {
      this.errorMessage = validationError;
      return;
    }

    const userRequest: UserRequest = {
      id: '',
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    };

    this.handleSupabaseSignup(userRequest);
  }

  private handleSupabaseSignup(userRequest: UserRequest) {
    this.supabaseService
      .signUp(this.email, this.password)
      .pipe(
        concatMap((authResponse) => {
          if (authResponse.error) {
            throw new Error(
              authResponse.error.message || 'Supabase sign-up failed.'
            );
          }

          const supabaseUserId = authResponse.data?.user?.id;
          if (!supabaseUserId) {
            throw new Error('Supabase did not return a user ID.');
          }

          // Add Supabase user ID to the backend user request
          userRequest.id = supabaseUserId;
          // Call the backend to save the user
          return this.userService.createUser(userRequest);
        })
      )
      .subscribe({
        next: () => {
          this.successMessage =
            'Registration successful! Please check your email for confirmation.';
        },
        error: () => {
          this.errorMessage = 'An error occurred during sign-up.';
        },
      });
  }

  private validateInput(): string | null {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      return 'All fields are required.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      return 'Please enter a valid email address.';
    }

    if (this.password !== this.confirmPassword) {
      return 'Passwords do not match.';
    }

    if (!this.agreeToTerms) {
      return 'You must agree to the terms and conditions.';
    }

    if (this.password.length < 6) {
      return 'Password should be at least 6 characters.';
    }

    return null; // No validation errors
  }
}
