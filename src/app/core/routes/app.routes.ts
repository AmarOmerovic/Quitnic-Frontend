import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'splash',
    loadComponent: () =>
      import(
        '../../features/auth/components/splash/splash-screen.component'
      ).then((m) => m.SplashScreenComponent),
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import(
        '../../features/auth/components/onboarding/onboarding-screen.component'
      ).then((m) => m.OnboardingScreenComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import(
        '../../features/auth/components/sign-up/signup-screen.component'
      ).then((m) => m.SignupScreenComponent),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import(
        '../../features/auth/components/sign-in/signin-screen.component'
      ).then((m) => m.SigninScreenComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        '../../features/dashboard/components/main/dashboard-screen.component'
      ).then((m) => m.DashboardScreenComponent),
    children: [
      {
        path: '',
        redirectTo: '/dashboard/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import(
            '../../features/dashboard/components/home/home-screen.component'
          ).then((m) => m.HomeScreenComponent),
      },
      {
        path: 'progress',
        loadComponent: () =>
          import(
            '../../features/dashboard/components/progress/progress-screen.component'
          ).then((m) => m.ProgressScreenComponent),
      },
      {
        path: 'achievements',
        loadComponent: () =>
          import(
            '../../features/dashboard/components/achievements/achievements-screen.component'
          ).then((m) => m.AchievementsScreenComponent),
      },
      {
        path: 'craving-help',
        loadComponent: () =>
          import(
            '../../features/dashboard/components/craving-help/craving-help-screen.component'
          ).then((m) => m.CravingHelpScreenComponent),
      },
      {
        path: 'personalization',
        loadComponent: () =>
          import(
            '../../features/dashboard/components/personalization/personalization-screen.component'
          ).then((m) => m.PersonalizationScreenComponent),
      },
    ],
  },
  {
    path: 'terms-and-conditions',
    loadComponent: () =>
      import(
        '../../features/auth/components/terms-and-conditions/terms-and-conditions-screen.component'
      ).then((m) => m.TermsAndConditionsScreenComponent),
  },
  {
    path: '',
    redirectTo: '/splash',
    pathMatch: 'full',
  },
];
