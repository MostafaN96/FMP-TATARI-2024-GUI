import { NgModule } from '@angular/core';

// Routing Module
import { BarChartReportSellByItemWeModuleRoutingModule } from './bar-chart-report-sell-by-item-we-module-routing.module';

// Component
import { BarChartReportSellByItemWeComponent } from 'src/app/main/we/reports/bar-chart-report-sell-by-item-we/bar-chart-report-sell-by-item-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { ChartsReportsModuleModule } from 'src/app/system-modules/main-pages-modules/charts-reports-module/charts-reports-module.module';

@NgModule({
  declarations: [
    BarChartReportSellByItemWeComponent
  ],
  imports: [
    SharedModule,
    BarChartReportSellByItemWeModuleRoutingModule,
    ChartsReportsModuleModule
  ],
  exports: [
    ChartsReportsModuleModule
  ]
})
export class BarChartReportSellByItemWeModuleModule { }
