import { Component, OnInit, NgZone, PLATFORM_ID, Inject } from '@angular/core';

// charts
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bar-chart-report-by-item',
  templateUrl: './bar-chart-report-by-item.component.html',
  styleUrls: ['./bar-chart-report-by-item.component.css']
})
export class BarChartReportByItemComponent implements OnInit {

  data:any
  constructor(
    @Inject(PLATFORM_ID) private platformId, private zone: NgZone

  ) { }

  ngOnInit(): void {
  }

   // amCharts imports
  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  listen() {
    this.getData()
  }
  
  getData() {
    this.browserOnly(() => {
      var chart = am4core.create("barchartdiv", am4charts.XYChart);
      chart.dateFormatter.dateFormat = "MM-yyyy";
      chart.legend = new am4charts.Legend();
      // this.result = response
      // this.loadPage()

      // Add data
      
      chart.data = this.data;

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
      categoryAxis.renderer.labels.template.textAlign = "middle";
      categoryAxis.baseInterval = {
        "timeUnit": "month",
        "count": 1
      }
      categoryAxis.dataFields.date = "date";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 10;
      // categoryAxis.renderer.grid.template.location = 0.5;
      // categoryAxis.startLocation = 0.5;
      // categoryAxis.endLocation = 0.5;
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.strokeWidth = 1
      series.dataFields.valueY = "quantity";
      series.dataFields.dateX = "date";
      series.columns.template.tooltipText = "{dateX}: [bold]{valueY}[/]";
      series.name = "الكمية";

      // Add a bullet
      var bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.label.text = "{quantity}";
      bullet.locationY = 0.5;
      bullet.zIndex = 2;
      bullet.label.fontSize = 14;

      // series.fill = am4core.color("#1C3FAA")

      // Enable export

      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "right";
      // chart.exporting.menu.verticalAlign = "top";
      // chart.exporting.menu.defaultStyles = false;
      let options = chart.exporting.getFormatOptions("pdf");
      options.addURL = false;
      chart.exporting.setFormatOptions("pdf", options);


    });
  }

}
