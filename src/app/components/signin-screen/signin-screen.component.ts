import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-screen',
  imports: [],
  templateUrl: './signin-screen.component.html',
  styleUrl: './signin-screen.component.scss',
})
export class SigninScreenComponent {
  constructor(private router: Router) {}

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
