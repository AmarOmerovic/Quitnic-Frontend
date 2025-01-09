import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-screen',
  imports: [CommonModule],
  templateUrl: './signup-screen.component.html',
  styleUrl: './signup-screen.component.scss',
})
export class SignupScreenComponent {
  constructor(private router: Router) {}

  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }
}
