import { Component, OnInit, ViewChild } from '@angular/core';

// Call Service
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";
import { SharedComponentService } from "src/app/services/shared-component.service";

// Child Components
import { PieChartReportBySupplierComponent } from "src/app/main/reports/charts-reports/pie-chart-report-by-supplier/pie-chart-report-by-supplier.component";
import { BarChartReportByBussinessManComponent } from "src/app/main/reports/charts-reports/bar-chart-report-by-bussiness-man/bar-chart-report-by-bussiness-man.component";

@Component({
  selector: 'app-pie-chart-report-by-manufactures-wb',
  templateUrl: './pie-chart-report-by-manufactures-wb.component.html',
  styleUrls: ['./pie-chart-report-by-manufactures-wb.component.css']
})
export class PieChartReportByManufacturesWbComponent implements OnInit {

  // Child Components
  @ViewChild('pieChartBySupplierReport')pieChartBySupplierReport!:PieChartReportBySupplierComponent;
  @ViewChild('barChartByBussinessmanReport')barChartByBussinessmanReport!:BarChartReportByBussinessManComponent;

  constructor(
    private _reportWbService: ReportWbService,
    public _sharedComponentService: SharedComponentService,

  ) { 
    this.getData()
  }

  ngOnInit(): void {
  }

  getData() {
  // Chart
  this._reportWbService.selectManufacturedByIndustries().subscribe((response: any) => {
    this.pieChartBySupplierReport.data = response
    this.pieChartBySupplierReport.listen();

    this.barChartByBussinessmanReport.data = response
    this.barChartByBussinessmanReport.listen();
  })
  }

}
