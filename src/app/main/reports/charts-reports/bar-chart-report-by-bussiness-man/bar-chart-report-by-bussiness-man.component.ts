import { Component, OnInit, NgZone, PLATFORM_ID, Inject } from '@angular/core';

// charts
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bar-chart-report-by-bussiness-man',
  templateUrl: './bar-chart-report-by-bussiness-man.component.html',
  styleUrls: ['./bar-chart-report-by-bussiness-man.component.css']
})
export class BarChartReportByBussinessManComponent implements OnInit {

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
      chart.legend = new am4charts.Legend();

      chart.scrollbarX = new am4core.Scrollbar();
      // this.result = response
      // this.loadPage()

      // Add data
      
      chart.data = this.data;
      
      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.fontSize = 12;
      
            // ------------------
            // chart.paddingBottom = 150;
            // chart.maskBullets = false;
            // categoryAxis.renderer.minGridDistance = 20;
            // categoryAxis.renderer.cellStartLocation = 0.1;
            // categoryAxis.renderer.cellEndLocation = 0.9;

      let label = categoryAxis.renderer.labels.template;
      label.wrap = true;
      label.maxWidth = 80;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());




      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "quantity";
      series.dataFields.categoryX = "name";
      series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
      series.name = "quantity";
      series.name = "الكمية";
      // series.strokeWidth = 10;
      // series.columns.template.width = am4core.percent(90);

      // Add a bullet
      var bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.label.text = "{quantity}";
      bullet.locationY = 0.5;
      bullet.zIndex = 2;
      bullet.label.fontSize = 14;

      // ------------------
      // series.columns.template.width = am4core.percent(95);
      // series.fill = am4core.color("#1C3FAA")
      
      // var bullet = series.bullets.push(new am4charts.LabelBullet);
  // bullet.label.text = "{name}";
  // bullet.label.rotation = 90;
  // bullet.label.truncate = false;
  // bullet.label.fontSize = 12;
  // bullet.label.hideOversized = false;
  // bullet.label.horizontalCenter = "right";
  // bullet.locationY = 1;
  // bullet.dy = 10;

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
