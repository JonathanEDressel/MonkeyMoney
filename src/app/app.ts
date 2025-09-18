import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <style>
      .main-body {
        height: 90%;
        background-color: lightgray;
        border-radius: 5px;
      }
    </style>
    <div class="container text-center main-body">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
