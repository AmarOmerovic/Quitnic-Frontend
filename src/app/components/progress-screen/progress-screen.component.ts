import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-screen',
  imports: [],
  templateUrl: './progress-screen.component.html',
  styleUrl: './progress-screen.component.scss',
})
export class ProgressScreenComponent implements OnInit {
  quitDate: string = '2025-01-01'; // Example date
  costPerPack: number = 5; // Example cost
  packsPerDay: number = 1; // Example packs smoked daily

  daysSmokeFree: number = 0;
  moneySaved: number = 0;
  cigarettesAvoided: number = 0;

  ngOnInit(): void {
    this.calculateProgress();
  }

  calculateProgress(): void {
    const quitDate = new Date(this.quitDate);
    const currentDate = new Date();

    // Calculate days smoke-free
    this.daysSmokeFree = Math.floor(
      (currentDate.getTime() - quitDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calculate money saved
    this.moneySaved = this.daysSmokeFree * this.costPerPack * this.packsPerDay;

    // Calculate cigarettes avoided (assuming 20 cigarettes per pack)
    this.cigarettesAvoided = this.daysSmokeFree * this.packsPerDay * 20;
  }
}
