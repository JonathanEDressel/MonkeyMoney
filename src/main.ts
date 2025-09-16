import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { LoginComponent } from './app/viewmodels/login';

bootstrapApplication(LoginComponent, appConfig)
  .catch((err) => console.error(err));
