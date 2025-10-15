import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

const totalWealthPlugin = {
    id: 'networthchart',
    afterDraw(chart: Chart) {
        // if (!chart.options.plugins?.networthChartEnabled)
            // return;

        const {ctx, chartArea: {top, bottom, left, right, width, height }} = chart;
        const centX = left + width / 2;
        const centY = top + height / 2;

        ctx.save();
        ctx.font = 'bold 22px Arial';
        ctx.fillStyle = '#000',
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const total = (chart.data.datasets[0].data as number[]).reduce((a: number, b: number) => a + b, 0);
        const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);
        ctx.fillText(format, centX, centY);
        ctx.restore();
    }
}

// Chart.register(totalWealthPlugin);

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
    constructor() {

    }

    ngOnInit(): void {
        this.activate();
    }

    activate() {
        console.log('overview tab called');
    }

    chartData: ChartDataset[] = [
        { 
            data: [ 16012, 600, 23310, 7835, 1538] , 
            label: ' Value',
            hoverOffset: 4
        }
    ];

    chartLabels: string[] = ['Savings', 'Checking', '401(k)', 'Roth IRA', 'Taxable'];

    accountChart: ChartConfiguration = {
        datasets: this.chartData,
        labels: this.chartLabels,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom', 
                    align: 'start',
                    display: true,
                }
            }
        },
        type: 'line'
    };

    netWorthOverviewChart: ChartConfiguration = {
        datasets: this.chartData,
        labels: this.chartLabels,
        options: {
            responsive: true,
            layout: {
                padding: {
                    top: 80,
                    bottom: 50
                },
            },
            plugins: {
                // networthChartEnabled: true,
                legend: {
                    position: 'bottom',
                    align: 'start',
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(ctx) {
                            var res = ctx.dataset.label || '';
                            if (res)
                                res += ': ';
                            if(ctx.parsed !== null)
                                res += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(ctx.parsed);
                            return res;
                        }
                    }
                },
                datalabels: {
                    labels: {
                        value: {
                            color: '#fff',
                            font: {
                                weight: 'bold',
                                size: 13
                            },
                            borderWidth: 1,
                            borderColor: '#fff',
                            borderRadius: 4,
                            backgroundColor: '#0674e9',
                            align: 'end',
                            anchor: 'end',
                            offset: 8,
                            clip: false,
                            formatter: (val, ctx) => {
                                var res = (ctx.chart.data.labels ? ctx.chart.data.labels[ctx.dataIndex] : '') + '\n';
                                res += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    maximumFractionDigits: 0
                                }).format(val);
                                return res;
                            }
                        }
                    }
                }
            }
        },
        type: 'doughnut'
    }
};

new Chart(document.getElementById('networthchart') as HTMLCanvasElement, netWorthOverviewChart);