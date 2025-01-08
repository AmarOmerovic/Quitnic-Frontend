import { Routes } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';

export const routes: Routes = [
    { path: 'splash', component: SplashScreenComponent }, 
    { path: 'welcome', component: WelcomeScreenComponent },
    { path: '', redirectTo: '/splash', pathMatch: 'full' },  // Default route
];
