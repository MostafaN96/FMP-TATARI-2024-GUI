import { NgModule } from '@angular/core';

// Routing Module
import { BarChartReportByDyerWdRoutingModule } from './bar-chart-report-by-dyer-wd-routing.module';

// Component
import { BarChartReportByDyerWdComponent } from 'src/app/main/wd/reports/bar-chart-report-by-dyer-wd/bar-chart-report-by-dyer-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { ChartsReportsModuleModule } from 'src/app/system-modules/main-pages-modules/charts-reports-module/charts-reports-module.module';

@NgModule({
  declarations: [
    BarChartReportByDyerWdComponent
  ],
  imports: [
    SharedModule,
    BarChartReportByDyerWdRoutingModule,
    ChartsReportsModuleModule
  ],
  exports: [
    ChartsReportsModuleModule
  ]
})
export class BarChartReportByDyerWdModule { }
