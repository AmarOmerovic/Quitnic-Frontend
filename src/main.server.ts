import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/shared/config/app.config.server';
import { AppComponent } from './app/shared/component/core/app.component';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
