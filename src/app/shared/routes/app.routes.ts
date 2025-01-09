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
    path: 'survey',
    loadComponent: () =>
      import('../../components/survey-screen/survey-screen.component').then(
        (m) => m.SurveyScreenComponent
      ),
  },
  {
    path: '',
    redirectTo: '/splash',
    pathMatch: 'full',
  }, // Default route
];
