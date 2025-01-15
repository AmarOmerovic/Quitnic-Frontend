import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/core/app-component/app.component';
import { appConfig } from './app/core/config/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
