import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'splash',
    loadComponent: () =>
      import('../../components/splash-screen/splash-screen.component').then(
        (m) => m.SplashScreenComponent
      ),
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import(
        '../../components/onboarding-screen/onboarding-screen.component'
      ).then((m) => m.OnboardingScreenComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('../../components/signup-screen/signup-screen.component').then(
        (m) => m.SignupScreenComponent
      ),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('../../components/signin-screen/signin-screen.component').then(
        (m) => m.SigninScreenComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        '../../components/dashboard-screen/dashboard-screen.component'
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
          import('../../components/home-screen/home-screen.component').then(
            (m) => m.HomeScreenComponent
          ),
      },
      {
        path: 'progress',
        loadComponent: () =>
          import(
            '../../components/progress-screen/progress-screen.component'
          ).then((m) => m.ProgressScreenComponent),
      },
      {
        path: 'achievements',
        loadComponent: () =>
          import(
            '../../components/achievements-screen/achievements-screen.component'
          ).then((m) => m.AchievementsScreenComponent),
      },
      {
        path: 'craving-help',
        loadComponent: () =>
          import(
            '../../components/craving-help-screen/craving-help-screen.component'
          ).then((m) => m.CravingHelpScreenComponent),
      },
      {
        path: 'personalization',
        loadComponent: () =>
          import(
            '../../components/personalization-screen/personalization-screen.component'
          ).then((m) => m.PersonalizationScreenComponent),
      },
    ],
  },
  {
    path: 'terms-and-conditions',
    loadComponent: () =>
      import(
        '../../components/terms-and-conditions-screen/terms-and-conditions-screen.component'
      ).then((m) => m.TermsAndConditionsScreenComponent),
  },
  {
    path: '',
    redirectTo: '/splash',
    pathMatch: 'full',
  },
];
