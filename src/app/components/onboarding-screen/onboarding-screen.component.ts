import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-screen',
  imports: [CommonModule],
  templateUrl: './onboarding-screen.component.html',
  styleUrl: './onboarding-screen.component.scss',
  standalone: true,
})
export class OnboardingScreenComponent {
  router = inject(Router);

  steps = [
    {
      title: 'Welcome to Quitnic!',
      description:
        'Quitnic is your partner in quitting smoking. We help you overcome cravings, track your progress, and stay motivated.',
      image: '/assets/a-person-looking-determined-or-a-small-group-celeb.svg',
    },
    {
      title: 'Track Your Progress',
      description:
        'Stay motivated by tracking how much money you’ve saved and the health benefits of quitting.',
      image: '/assets/a-piggy-bank-or-a-bar-graph-showing-progress-.svg',
    },
    {
      title: 'Get Support Anytime',
      description:
        'Access tools, tips, and motivation to overcome cravings whenever you need it.',
      image: '/assets/two-people-on-a-staircase--one-person-firmly-holdi.svg',
    },
  ];

  currentStep = 0;

  get currentContent() {
    return this.steps[this.currentStep];
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.router.navigate(['/signup'], { replaceUrl: true });
    }
  }

  skip() {
    console.log('TEst');
    this.router.navigate(['/signup'], { replaceUrl: true });
  }
}
