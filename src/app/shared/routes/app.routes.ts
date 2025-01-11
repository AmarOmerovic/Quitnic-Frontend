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
      ).then((m) => m.SurveyScreenComponent),
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
  }, // Default route
];
