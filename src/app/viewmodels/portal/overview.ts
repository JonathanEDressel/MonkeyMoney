import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js';

interface ChartConfiguration {
    datasets: ChartDataset[];
    labels: string[];
    options: ChartOptions;
    type: ChartType;
}

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

    chartData: ChartDataset[] = [
        { data: [100, 200, 300, 230, 115], label: 'Series 1' },
        { data: [10, 20, 30, 20, 15], label: 'Series 2' }
    ];

    chartLabels: string[] = ['Jan', 'Feb', 'Mar', "Apr', 'May"];

    public mynewchart: ChartConfiguration = {
        datasets: this.chartData,
        labels: this.chartLabels,
        options: {
            responsive: true,
            plugins: {
                title: {
                    text: 'Net Worth',
                    // color: Chart.defaults.color,
                    align: 'center',
                    display: true,
                    fullSize: true,
                    position: 'top',
                    font: {
                        size: 35
                    }
                }
            }
        },
        type: 'bar'
    }
};