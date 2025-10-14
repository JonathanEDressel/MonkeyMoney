import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'overview-root',
  imports: [FormsModule, BaseChartDirective],
  templateUrl: '../../views/portal/overview.html',
  styleUrl: '../../styles/portal/overview.scss'
})

export class OverviewComponent {
    ngOnInit(): void {
        this.activate();
    }

    activate() {
        console.log('overview tab called');
    }
    // months: string[] = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.'];
    months = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Revenue',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    barData: ChartOptions = {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
  };

    // barData: any[] = [
    //     {
    //         data: [4400,5500,18000,43000,78900,120000],
    //         label: '$ Value'
    //     }
    // ]
};