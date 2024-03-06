import { NgModule } from '@angular/core';

// Routing Module
import { BarChartReportByItemWeModuleRoutingModule } from './bar-chart-report-by-item-we-module-routing.module';

// Component
import { BarChartReportByItemWeComponent } from 'src/app/main/we/reports/bar-chart-report-by-item-we/bar-chart-report-by-item-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { ChartsReportsModuleModule } from 'src/app/system-modules/main-pages-modules/charts-reports-module/charts-reports-module.module';

@NgModule({
  declarations: [
    BarChartReportByItemWeComponent
  ],
  imports: [
    SharedModule,
    BarChartReportByItemWeModuleRoutingModule,
    ChartsReportsModuleModule
  ],
  exports: [
    ChartsReportsModuleModule
  ]
})
export class BarChartReportByItemWeModuleModule { }
