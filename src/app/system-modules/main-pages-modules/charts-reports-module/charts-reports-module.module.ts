import { NgModule } from '@angular/core';

import { BarChartReportByItemComponent } from 'src/app/main/reports/charts-reports/bar-chart-report-by-item/bar-chart-report-by-item.component';
import { BarChartReportBySupplierComponent } from 'src/app/main/reports/charts-reports/bar-chart-report-by-supplier/bar-chart-report-by-supplier.component';
import { PieChartReportBySupplierComponent } from 'src/app/main/reports/charts-reports/pie-chart-report-by-supplier/pie-chart-report-by-supplier.component';
import { BarChartReportByBussinessManComponent } from 'src/app/main/reports/charts-reports/bar-chart-report-by-bussiness-man/bar-chart-report-by-bussiness-man.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';


@NgModule({
  declarations: [
    BarChartReportByItemComponent,
    BarChartReportBySupplierComponent,
    PieChartReportBySupplierComponent,
    BarChartReportByBussinessManComponent,
],
  imports: [
    SharedModule
  ],
  exports: [
    // Components
    BarChartReportByItemComponent,
    BarChartReportBySupplierComponent,
    PieChartReportBySupplierComponent,
    BarChartReportByBussinessManComponent,
  ]
})
export class ChartsReportsModuleModule { }
