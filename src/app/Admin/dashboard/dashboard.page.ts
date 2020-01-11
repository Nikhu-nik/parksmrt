import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild('lineChart', { static: true }) lineChart;
  @ViewChild('barChart', { static: true }) barChart;

  line: any;
  colorArray: any;
  fullName = 'Jhon';
  bar: any;
  date: any;

  constructor() { }

  ngOnInit() {
    this.createBarChart();
    this.createPieChart();
  }


  createBarChart() {
    this.line = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Total Cost',
          data: [2.5, 3.8, 4, 4.9, 5.9, 6.5, 7, 6, 6.5, 7, 5.8, 6,],
          // backgroundColor: 'rgb(38, 194, 129)',
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Total Revenue',
          data: [2, 4.8, 5, 5.7, 5.9, 6.7, 7, 5, 5.5, 6.1, 7, 7.5],
          backgroundColor: 'rgb(38, 194, 129)',
          borderColor: '#7044ff',
          borderWidth: 1,
          fill: false
        }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createPieChart() {
    this.bar = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Total Cost',
          data: [2.5, 3.8, 4, 4.9, 5.9, 6.5, 7, 6, 6.5, 7, 5.8, 6,],
          backgroundColor: '#10dc60',
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Total Revenue',
          data: [2, 4.8, 5, 5.7, 5.9, 6.7, 7, 5, 5.5, 6.1, 7, 7.5],
          backgroundColor: '#7044ff',
          borderColor: '#7044ff',
          borderWidth: 1,
          fill: false
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Comparison of total revenue and cost'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }



}

