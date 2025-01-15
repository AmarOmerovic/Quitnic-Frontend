import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { SupabaseService } from '../../../../core/services/supabase/supabase.service';

@Component({
  selector: 'app-signin-screen',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin-screen.component.html',
  styleUrl: './signin-screen.component.scss',
})
export class SigninScreenComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private supabaseService = inject(SupabaseService);

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading = false;
  rememberMe = false;

  ngOnInit() {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      this.email = savedEmail;
      this.rememberMe = true;
    }
  }

  navigateToSignUp() {
    this.router.navigateByUrl('/signup');
  }

  login() {
    this.errorMessage = '';

    const validationError = this.validateInput();
    if (validationError) {
      this.errorMessage = validationError;
      return;
    }

    this.isLoading = true;
    this.performSupabaseLogin();
  }

  private performSupabaseLogin() {
    this.supabaseService.signIn(this.email, this.password).subscribe({
      next: (result) => this.handleSupabaseResponse(result),
      error: () => this.handleSupabaseError(),
    });
  }

  private handleSupabaseResponse(result: any) {
    if (result.error) {
      this.supabaseService.signOut().subscribe({
        error: (error) => console.error('Error during sign out:', error),
      });
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
      next: (data) => {
        this.saveDataToStorage(userId, data.firstName, data.lastName);
        this.router.navigateByUrl('/dashboard');
      },
      error: () => this.handleBackendError(),
    });
  }

  private saveDataToStorage(
    userId: string,
    firstName: string,
    lastName: string
  ) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('fullName', `${firstName} ${lastName}`);
    if (this.rememberMe) {
      localStorage.setItem('savedEmail', this.email);
    } else {
      localStorage.removeItem('savedEmail');
    }
  }
  private handleSupabaseError() {
    this.isLoading = false;
    this.errorMessage = 'An unexpected error occurred during sign-in.';
  }

  private handleBackendError() {
    this.isLoading = false;
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
