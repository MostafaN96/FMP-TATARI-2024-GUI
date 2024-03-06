import { Component, OnInit, ViewChild } from '@angular/core';

// Call Service
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";
import { SharedComponentService } from "src/app/services/shared-component.service";

// Child Components
import { PieChartReportBySupplierComponent } from "src/app/main/reports/charts-reports/pie-chart-report-by-supplier/pie-chart-report-by-supplier.component";
import { BarChartReportByBussinessManComponent } from "src/app/main/reports/charts-reports/bar-chart-report-by-bussiness-man/bar-chart-report-by-bussiness-man.component";

@Component({
  selector: 'app-pie-chart-report-by-suppliers-wa',
  templateUrl: './pie-chart-report-by-suppliers-wa.component.html',
  styleUrls: ['./pie-chart-report-by-suppliers-wa.component.css']
})
export class PieChartReportBySuppliersWaComponent implements OnInit {

  // Child Components
  @ViewChild('pieChartBySupplierReport')pieChartBySupplierReport!:PieChartReportBySupplierComponent;
  @ViewChild('barChartByBussinessmanReport')barChartByBussinessmanReport!:BarChartReportByBussinessManComponent;

  constructor(
    private _reportWaService: ReportWaService,
    public _sharedComponentService: SharedComponentService,

  ) { 
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
  // Chart
  this._reportWaService.purchasesBySuppliers().subscribe((response: any) => {
    this.pieChartBySupplierReport.data = response
    this.pieChartBySupplierReport.listen();

    this.barChartByBussinessmanReport.data = response
    this.barChartByBussinessmanReport.listen();
  })
  }

}
