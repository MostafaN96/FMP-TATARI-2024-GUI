import { Component, OnInit, NgZone, PLATFORM_ID, Inject } from '@angular/core';

// Import modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-pie-chart-report-by-supplier',
  templateUrl: './pie-chart-report-by-supplier.component.html',
  styleUrls: ['./pie-chart-report-by-supplier.component.css']
})
export class PieChartReportBySupplierComponent implements OnInit {

  data: any
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
      // Create chart instance
      let chart = am4core.create("chartdiv", am4charts.PieChart);

      // Add data
      chart.data = this.data;

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "quantity";
      pieSeries.dataFields.category = "name";

      // Add a legend
      chart.legend = new am4charts.Legend();
      chart.legend.labels.template.text = "[bold {color}]{name}[/] ({quantity})";
      chart.legend.maxHeight = 450;
      chart.legend.width = 350;
      chart.legend.minWidth = 350;
      chart.legend.maxWidth = 350;
      chart.legend.scrollable = true;
      chart.legend.valueLabels.template.align = "right";
      chart.legend.valueLabels.template.textAlign = "end";
      chart.legend.itemContainers.template.paddingTop = 5;
      chart.legend.itemContainers.template.paddingBottom = 5;
      chart.legend.position = "right";
      chart.legend.labels.template.truncate = false;
      chart.radius = am4core.percent(35);

      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "right";
      
      // chart.exporting.menu.verticalAlign = "top";
      // // chart.exporting.menu.defaultStyles = false;
      // let options = chart.exporting.getFormatOptions("pdf");
      // options.addURL = false;
      // chart.exporting.setFormatOptions("pdf", options);
      
    });
  }
}
