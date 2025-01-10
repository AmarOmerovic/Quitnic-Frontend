import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terms-and-conditions-screen',
  imports: [],
  templateUrl: './terms-and-conditions-screen.component.html',
  styleUrl: './terms-and-conditions-screen.component.scss',
  standalone: true,
})
export class TermsAndConditionsScreenComponent {
  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
