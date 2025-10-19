import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'history-root',
  imports: [FormsModule],
  templateUrl: '../../views/portal/accounts.html',
  styleUrl: '../../styles/portal/accounts.scss'
})

export class AccountsComponent {
    ngOnInit(): void {
        this.activate();
    }

    activate(): void {
        console.log('account tab called');
    }
}