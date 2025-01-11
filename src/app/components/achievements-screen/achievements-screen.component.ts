import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-achievements-screen',
  imports: [CommonModule],
  templateUrl: './achievements-screen.component.html',
  styleUrl: './achievements-screen.component.scss',
})
export class AchievementsScreenComponent {
  achievements = [
    {
      title: '1 Day Smoke-Free',
      unlocked: true,
      icon: 'fas fa-calendar-check',
    },
    {
      title: '3 Days Smoke-Free',
      unlocked: false,
      icon: 'fas fa-calendar-alt',
    },
    {
      title: '1 Week Smoke-Free',
      unlocked: false,
      icon: 'fas fa-hourglass-half',
    },
    { title: '10 Days Smoke-Free', unlocked: false, icon: 'fas fa-clock' },
    {
      title: '2 Weeks Smoke-Free',
      unlocked: false,
      icon: 'fas fa-hourglass-end',
    },
    { title: '3 Weeks Smoke-Free', unlocked: false, icon: 'fas fa-stopwatch' },
    { title: '1 Month Smoke-Free', unlocked: false, icon: 'fas fa-star' },
    { title: '2 Months Smoke-Free', unlocked: false, icon: 'fas fa-star-half' },
    { title: '3 Months Smoke-Free', unlocked: false, icon: 'fas fa-star' },
    {
      title: '6 Months Smoke-Free',
      unlocked: false,
      icon: 'fas fa-certificate',
    },
    { title: '1 Year Smoke-Free', unlocked: false, icon: 'fas fa-medal' },
    { title: '2 Years Smoke-Free', unlocked: false, icon: 'fas fa-trophy' },
    { title: '5 Years Smoke-Free', unlocked: false, icon: 'fas fa-crown' },

    // Money Saved Milestones
    { title: '$50 Saved', unlocked: true, icon: 'fas fa-dollar-sign' },
    { title: '$100 Saved', unlocked: false, icon: 'fas fa-coins' },
    { title: '$200 Saved', unlocked: false, icon: 'fas fa-piggy-bank' },
    { title: '$500 Saved', unlocked: false, icon: 'fas fa-wallet' },
    { title: '$1,000 Saved', unlocked: false, icon: 'fas fa-hand-holding-usd' },
    { title: '$2,000 Saved', unlocked: false, icon: 'fas fa-sack-dollar' },
    { title: '$5,000 Saved', unlocked: false, icon: 'fas fa-chart-line' },

    // Health Improvements
    { title: 'Improved Lung Capacity', unlocked: false, icon: 'fas fa-lungs' },
    {
      title: 'Better Blood Circulation',
      unlocked: false,
      icon: 'fas fa-heart',
    },
    {
      title: 'Decreased Risk of Stroke',
      unlocked: false,
      icon: 'fas fa-brain',
    },
    {
      title: 'Improved Heart Health',
      unlocked: false,
      icon: 'fas fa-heartbeat',
    },
    { title: 'Skin Health Restored', unlocked: false, icon: 'fas fa-spa' },
    { title: 'Sense of Smell Improved', unlocked: false, icon: 'fas fa-nose' },
    {
      title: 'Sense of Taste Restored',
      unlocked: false,
      icon: 'fas fa-utensils',
    },
    { title: 'Lung Damage Repaired', unlocked: false, icon: 'fas fa-lungs' },
    { title: 'Reduced Cancer Risk', unlocked: false, icon: 'fas fa-dna' },
    { title: 'Increased Energy Levels', unlocked: false, icon: 'fas fa-bolt' },

    // Motivation Milestones
    { title: '1 Craving Overcome', unlocked: true, icon: 'fas fa-fist-raised' },
    { title: '5 Cravings Overcome', unlocked: false, icon: 'fas fa-hand-rock' },
    { title: '10 Cravings Overcome', unlocked: false, icon: 'fas fa-trophy' },
    {
      title: '20 Cravings Overcome',
      unlocked: false,
      icon: 'fas fa-shield-alt',
    },
    { title: '30 Cravings Overcome', unlocked: false, icon: 'fas fa-dumbbell' },
    { title: '100 Cravings Overcome', unlocked: false, icon: 'fas fa-medal' },

    // Time-Based Milestones
    {
      title: '1 Hour Without Smoking',
      unlocked: true,
      icon: 'fas fa-hourglass-start',
    },
    {
      title: '3 Hours Without Smoking',
      unlocked: false,
      icon: 'fas fa-hourglass-half',
    },
    {
      title: '6 Hours Without Smoking',
      unlocked: false,
      icon: 'fas fa-hourglass-end',
    },
    {
      title: '12 Hours Without Smoking',
      unlocked: false,
      icon: 'fas fa-clock',
    },
    { title: '24 Hours Without Smoking', unlocked: false, icon: 'fas fa-sun' },

    // Random Fun Achievements
    { title: 'First Step Taken', unlocked: true, icon: 'fas fa-shoe-prints' },
    { title: 'Skipped a Smoke Break', unlocked: false, icon: 'fas fa-coffee' },
    {
      title: 'Shared Your Goal with Friends',
      unlocked: false,
      icon: 'fas fa-users',
    },
    {
      title: 'Used the Craving Timer 3 Times',
      unlocked: false,
      icon: 'fas fa-stopwatch',
    },
    {
      title: 'Motivational Tip Read',
      unlocked: true,
      icon: 'fas fa-lightbulb',
    },
    {
      title: 'Set Your Quit Date',
      unlocked: true,
      icon: 'fas fa-calendar-alt',
    },
  ];
}
