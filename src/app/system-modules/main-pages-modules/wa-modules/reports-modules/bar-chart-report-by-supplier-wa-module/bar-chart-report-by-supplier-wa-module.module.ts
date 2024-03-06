import { NgModule } from '@angular/core';

// Routing Module
import { BarChartReportBySupplierWaModuleRoutingModule } from './bar-chart-report-by-supplier-wa-module-routing.module';

// Component
import { BarChartReportBySupplierWaComponent } from 'src/app/main/wa/reports/bar-chart-report-by-supplier-wa/bar-chart-report-by-supplier-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { ChartsReportsModuleModule } from 'src/app/system-modules/main-pages-modules/charts-reports-module/charts-reports-module.module';

@NgModule({
  declarations: [
    BarChartReportBySupplierWaComponent
  ],
  imports: [
    SharedModule,
    BarChartReportBySupplierWaModuleRoutingModule,
    ChartsReportsModuleModule
  ],
  exports: [
    ChartsReportsModuleModule
  ]
})
export class BarChartReportBySupplierWaModuleModule { }
