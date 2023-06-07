export class Chart {
  pointStart;
  chart;

  constructor(initialPredatorsAmount, initialPreysAmount) {
    this.pointStart = 0;
    this.initChart(initialPredatorsAmount, initialPreysAmount);
  }

  initChart = (initialPredatorsAmount, initialPreysAmount) => {
    this.chart = Highcharts.chart('chart-container', {
      title: {
        text: 'Predators and preys Statistic',
        align: 'left'
      },

      subtitle: {
        text: 'Active game statistic',
        align: 'left'
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      xAxis: {
        min: 0,
        max: 9,
      },
      yAxis: {
        title: {
          text: 'Number of Animals'
        }
      },
      plotOptions: {
        series: {
          label: {
            enabled: true
          },
          marker: {
            enabled: true
          },
          pointStart: this.pointStart,
        }
      },
      series: [{
        name: 'Predators',
        data: [initialPredatorsAmount]
      },
      {
        name: 'Preys',
        data: [initialPreysAmount]
      }]
    });
  }

  update = (predatorsAmount, preysAmount) => {
    this.chart.series[0].addPoint(predatorsAmount);
    this.chart.series[1].addPoint(preysAmount);

    // to move chart in live
    this.pointStart+=1;
    this.chart.xAxis[0].setExtremes(Math.max(this.pointStart-9, 0), this.pointStart < 10 ? 9 : this.pointStart);
  }
}
