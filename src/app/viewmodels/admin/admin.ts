import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'admin-root',
  imports: [FormsModule],
  templateUrl: '../../views/admin/admin.html',
  styleUrl: '../../styles/admin/admin.scss'
})

export class AdminComponent {
    ngOnInit(): void {
        this.activate();
    }

    activate(): void {
        console.log('account tab called');
    }
}