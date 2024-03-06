import { Component, OnInit, ViewChild } from '@angular/core';

// Call Service
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";
import { SharedComponentService } from "src/app/services/shared-component.service";

// Child Components
import { PieChartReportBySupplierComponent } from "src/app/main/reports/charts-reports/pie-chart-report-by-supplier/pie-chart-report-by-supplier.component";
import { BarChartReportByBussinessManComponent } from "src/app/main/reports/charts-reports/bar-chart-report-by-bussiness-man/bar-chart-report-by-bussiness-man.component";

@Component({
  selector: 'app-pie-chart-report-by-deiers-wd',
  templateUrl: './pie-chart-report-by-deiers-wd.component.html',
  styleUrls: ['./pie-chart-report-by-deiers-wd.component.css']
})
export class PieChartReportByDeiersWdComponent implements OnInit {

  // Child Components
  @ViewChild('pieChartBySupplierReport')pieChartBySupplierReport!:PieChartReportBySupplierComponent;
  @ViewChild('barChartByBussinessmanReport')barChartByBussinessmanReport!:BarChartReportByBussinessManComponent;

  constructor(
    private _reportWdService: ReportWdService,
    public _sharedComponentService: SharedComponentService,

  ) { 
    this.getData()
  }

  ngOnInit(): void {
  }

  getData() {
  // Chart
  this._reportWdService.dyeingReportByDyes().subscribe((response: any) => {
    this.pieChartBySupplierReport.data = response
    this.pieChartBySupplierReport.listen();

    this.barChartByBussinessmanReport.data = response
    this.barChartByBussinessmanReport.listen();
  })
  }

}
