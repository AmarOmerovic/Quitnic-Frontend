import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../shared/services/supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin-screen',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin-screen.component.html',
  styleUrl: './signin-screen.component.scss',
})
export class SigninScreenComponent {
  email: string = '';
  password: string = '';

  errorMessage: string = '';

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

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

    try {
      const data = await this.supabaseService.signIn(this.email, this.password);
      console.log('Logged');
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred during sign-up.';
    }
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
