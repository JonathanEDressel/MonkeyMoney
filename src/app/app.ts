import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <style>
      .main-body {
        border-radius: 15px;
      }
    </style>
    <div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
