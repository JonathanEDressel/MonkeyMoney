import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

interface Record {
    Date: string;
    Total: number;
    Accounts: number[];
}

@Component({
  selector: 'history-root',
  imports: [FormsModule],
  templateUrl: '../../views/portal/history.html',
  styleUrl: '../../styles/portal/history.scss'
})

export class HistoryComponent {
    ngOnInit(): void {
        this.activate();
    }

    activate(): void {
        // console.log('history tab called');
    }

    accountHistory: Record[] = [
        {
            Date: '1/1/2025',
            Total: 25000,
            Accounts: [8000, 2000, 15000]
        },
        {
            Date: '1/1/2025',
            Total: 25000,
            Accounts: [8000, 2000, 15000]
        },
        {
            Date: '1/1/2025',
            Total: 25000,
            Accounts: [8000, 2000, 15000]
        },
        {
            Date: '1/1/2025',
            Total: 25000,
            Accounts: [8000, 2000, 15000]
        },
        {
            Date: '1/1/2025',
            Total: 25000,
            Accounts: [8000, 2000, 15000]
        },
        {
            Date: '1/1/2025',
            Total: 25000,
            Accounts: [8000, 2000, 15000]
        },
        {
            Date: '1/1/2025',
            Total: 25000,
            Accounts: [8000, 2000, 15000]
        },
        {
            Date: '1/1/2025',
            Total: 25000,
            Accounts: [8000, 2000, 15000]
        },
        {
            Date: '1/1/2025',
            Total: 25000,
            Accounts: [8000, 2000, 15000]
        }
    ];
}