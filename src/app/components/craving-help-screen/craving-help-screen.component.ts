import { Component } from '@angular/core';

@Component({
  selector: 'app-craving-help-screen',
  imports: [],
  templateUrl: './craving-help-screen.component.html',
  styleUrl: './craving-help-screen.component.scss',
})
export class CravingHelpScreenComponent {
  tips: string[] = [
    "You're stronger than your cravings!",
    'Take a deep breath and count to 10.',
    'Drink a glass of water and wait 5 minutes.',
    "Think about how far you've come!",
    'Distract yourself with a walk or a short activity.',
  ];

  currentTip: string = this.tips[0];
  daysSmokeFree: number = 10; // Replace with actual calculation
  moneySaved: number = 50; // Replace with actual calculation
  quitReason: string = 'Your family'; // Example from personalization

  timerDisplay: string = '00:10:00.000';
  timer: any;
  timerMilliseconds: number = 600000; // 10 minutes in milliseconds

  getNewTip(): void {
    const randomIndex = Math.floor(Math.random() * this.tips.length);
    this.currentTip = this.tips[randomIndex];
  }

  startTimer(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.timerMilliseconds > 0) {
        this.timerMilliseconds -= 10;
        const minutes = Math.floor(this.timerMilliseconds / 60000);
        const seconds = Math.floor((this.timerMilliseconds % 60000) / 1000);
        const milliseconds = this.timerMilliseconds % 1000;
        this.timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
      } else {
        clearInterval(this.timer);
        this.timer = null;
        this.timerDisplay = '00:00:00.000';
      }
    }, 10); // Update every 10ms for millisecond precision
  }

  resetTimer(): void {
    if (this.timer) clearInterval(this.timer);
    this.timerMilliseconds = 600000;
    this.timerDisplay = '00:10:00.000';
  }
}
