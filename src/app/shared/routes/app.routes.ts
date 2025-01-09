import { Routes } from '@angular/router';
import { SplashScreenComponent } from '../../components/splash-screen/splash-screen.component';
import { OnboardingScreenComponent } from '../../components/onboarding-screen/onboarding-screen.component';
import { SignupScreenComponent } from '../../components/signup-screen/signup-screen.component';
import { SigninScreenComponent } from '../../components/signin-screen/signin-screen.component';

export const routes: Routes = [
  { path: 'splash', component: SplashScreenComponent },
  { path: 'onboarding', component: OnboardingScreenComponent },
  { path: 'signup', component: SignupScreenComponent },
  { path: 'signin', component: SigninScreenComponent },
  { path: '', redirectTo: '/splash', pathMatch: 'full' }, // Default route
];
