import { Component, OnInit, ViewChild } from '@angular/core';

// Call Service
import { ReportWeService } from "src/app/services/main/we/report-we.service";
import { SharedComponentService } from "src/app/services/shared-component.service";

// Child Components
import { PieChartReportBySupplierComponent } from "src/app/main/reports/charts-reports/pie-chart-report-by-supplier/pie-chart-report-by-supplier.component";
import { BarChartReportByBussinessManComponent } from "src/app/main/reports/charts-reports/bar-chart-report-by-bussiness-man/bar-chart-report-by-bussiness-man.component";

@Component({
  selector: 'app-pie-chart-report-sell-by-sellers-we',
  templateUrl: './pie-chart-report-sell-by-sellers-we.component.html',
  styleUrls: ['./pie-chart-report-sell-by-sellers-we.component.css']
})
export class PieChartReportSellBySellersWeComponent implements OnInit {

  // Child Components
  @ViewChild('pieChartBySupplierReport')pieChartBySupplierReport!:PieChartReportBySupplierComponent;
  @ViewChild('barChartByBussinessmanReport')barChartByBussinessmanReport!:BarChartReportByBussinessManComponent;

  constructor(
    private _reportWeService: ReportWeService,
    public _sharedComponentService: SharedComponentService,

  ) { 
    this.getData()
  }

  ngOnInit(): void {
  }

  getData() {
  // Chart
  this._reportWeService.selectSellBySellers().subscribe((response: any) => {
    this.pieChartBySupplierReport.data = response
    this.pieChartBySupplierReport.listen();

    this.barChartByBussinessmanReport.data = response
    this.barChartByBussinessmanReport.listen();
  })
  }

}
