import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  imports: [],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
})
export class HomeScreenComponent {
  router = inject(Router);

  navigateTo(page: string): void {
    this.router.navigateByUrl(`/${page}`);
  }
}
