import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../shared/services/supabase/supabase.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-signin-screen',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin-screen.component.html',
  styleUrl: './signin-screen.component.scss',
})
export class SigninScreenComponent {
  router = inject(Router);
  userService = inject(UserService);
  supabaseService = inject(SupabaseService);

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  login() {
    this.errorMessage = '';

    const validationError = this.validateInput();
    if (validationError) {
      this.errorMessage = validationError;
      return;
    }

    this.performSupabaseLogin();
  }

  private performSupabaseLogin() {
    this.supabaseService.signIn(this.email, this.password).subscribe({
      next: (result) => this.handleSupabaseResponse(result),
      error: (supabaseError) => this.handleSupabaseError(),
    });
  }

  private handleSupabaseResponse(result: any) {
    if (result.error) {
      this.errorMessage = 'An error occurred during sign-in.';
      return;
    }

    const supabaseUserId = result.data?.user?.id;
    if (!supabaseUserId) {
      this.errorMessage = 'Supabase did not return a user ID.';
      return;
    }

    this.fetchUserFromBackend(supabaseUserId);
  }

  private fetchUserFromBackend(userId: string) {
    this.userService.fetchUserWithId(userId).subscribe({
      next: () => this.router.navigateByUrl('/survey'),
      error: () => this.handleBackendError(),
    });
  }

  private handleSupabaseError() {
    this.errorMessage = 'An unexpected error occurred during sign-in.';
  }

  private handleBackendError() {
    this.errorMessage = 'Unauthorized access. Please reach out to get support.';
  }

  private validateInput(): string | null {
    if (!this.email || !this.password) {
      return 'All fields are required.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      return 'Please enter a valid email address.';
    }

    return null;
  }
}
