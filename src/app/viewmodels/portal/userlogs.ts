import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'history-root',
  imports: [FormsModule],
  templateUrl: '../../views/portal/history.html',
  styleUrl: '../../styles/portal/history.scss'
})

interface Record {
    date: string;
    account: string;
    balance: number;
}

export class HistoryComponent {
    ngOnInit(): void {
        this.activate();
    }

    activate(): void {
        console.log('history tab called');
    }

    historyData: Record[] = [
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
        { date: '1/1/2025', account: 'Roth IRA', balance: 50000 },
    ]
}