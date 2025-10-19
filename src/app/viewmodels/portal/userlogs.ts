import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

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
        console.log('history tab called');
    }
}