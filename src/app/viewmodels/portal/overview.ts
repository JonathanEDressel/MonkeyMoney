import { FormsModule } from '@angular/forms';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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

@Component({
  selector: 'overview-root',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: '../../views/portal/overview.html',
  styleUrl: '../../styles/portal/overview.scss'
})

export class OverviewComponent implements AfterViewInit {
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    ngOnInit(): void {
        this.activate();
    }

    activate() {
        console.log('overview tab called');
    }

    ngAfterViewInit() {
    }

    chartData: ChartDataset<'doughnut'>[] = [
        { 
            data: [ 16012, 600, 23310, 7835, 1538] , 
            label: ' Value',
            hoverOffset: 4
        }
    ];

    lineChartLabels: string[] = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.']
    chartLabels: string[] = ['Savings', 'Checking', '401(k)', 'Roth IRA', 'Taxable'];

    lineChartData: ChartDataset<'line'>[] = [
        { 
            data: [ 150, 200, 230, 300, 340, 450, 560 ] , 
            label: ' Value'
        }
    ];

    accountChart: ChartConfiguration<'line'> = {
        type: 'line',
        
        data: {
            datasets: this.lineChartData,
            labels: this.lineChartLabels
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    text: 'Roth IRA',
                    display: true,
                    font: {
                        weight: 'bold',
                        size: 20
                    }
                },
                legend: {
                    display: false,
                }
            }
        }
    };

    netWorthOverviewChart: ChartConfiguration<'doughnut'> = {
        type: 'doughnut',
        data: {
            datasets: this.chartData,
            labels: this.chartLabels
        },
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
        plugins: [ChartDataLabels, totalWealthPlugin]
    }


    // new Chart(document.getElementById('networthchart') as HTMLCanvasElement, netWorthOverviewChart);
};
