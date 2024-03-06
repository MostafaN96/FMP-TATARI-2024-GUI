import { NgModule } from '@angular/core';

// Routing Module
import { BarChartReportByItemWcModuleRoutingModule } from './bar-chart-report-by-item-wc-module-routing.module';

// Component
import { BarChartReportByItemWcComponent } from 'src/app/main/wc/reports/bar-chart-report-by-item-wc/bar-chart-report-by-item-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { ChartsReportsModuleModule } from 'src/app/system-modules/main-pages-modules/charts-reports-module/charts-reports-module.module';

@NgModule({
  declarations: [
    BarChartReportByItemWcComponent
  ],
  imports: [
    SharedModule,
    BarChartReportByItemWcModuleRoutingModule,
    ChartsReportsModuleModule
  ],
  exports: [
    ChartsReportsModuleModule
  ]
})
export class BarChartReportByItemWcModuleModule { }
