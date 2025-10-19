import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'overview-root',
  imports: [FormsModule],
  templateUrl: '../../views/portal/profile.html',
  styleUrl: '../../styles/portal/profile.scss'
})

export class ProfileComponent {
    ngOnInit(): void {
        this.activate();
    }

    activate(): void {
        console.log('profile tab called');
    }

}