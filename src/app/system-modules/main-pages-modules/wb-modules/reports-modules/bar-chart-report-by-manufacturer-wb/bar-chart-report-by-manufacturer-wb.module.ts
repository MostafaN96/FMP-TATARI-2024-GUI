import { NgModule } from '@angular/core';

// Routing Module
import { BarChartReportByManufacturerWbRoutingModule } from './bar-chart-report-by-manufacturer-wb-routing.module';

// Component
import { BarChartReportByManufacturerWbComponent } from 'src/app/main/wb/reports/bar-chart-report-by-manufacturer-wb/bar-chart-report-by-manufacturer-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { ChartsReportsModuleModule } from 'src/app/system-modules/main-pages-modules/charts-reports-module/charts-reports-module.module';

@NgModule({
  declarations: [
    BarChartReportByManufacturerWbComponent
  ],
  imports: [
    SharedModule,
    BarChartReportByManufacturerWbRoutingModule,
    ChartsReportsModuleModule
  ],
  exports: [
    ChartsReportsModuleModule
  ]
})
export class BarChartReportByManufacturerWbModule { }
