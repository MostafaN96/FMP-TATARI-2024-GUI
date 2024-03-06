import { NgModule } from '@angular/core';

// Routing Module
import { BarChartReportSellBySellerWeModuleRoutingModule } from './bar-chart-report-sell-by-seller-we-module-routing.module';

// Component
import { BarChartReportSellBySellerWeComponent } from 'src/app/main/we/reports/bar-chart-report-sell-by-seller-we/bar-chart-report-sell-by-seller-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { ChartsReportsModuleModule } from 'src/app/system-modules/main-pages-modules/charts-reports-module/charts-reports-module.module';

@NgModule({
  declarations: [
    BarChartReportSellBySellerWeComponent
  ],
  imports: [
    SharedModule,
    BarChartReportSellBySellerWeModuleRoutingModule,
    ChartsReportsModuleModule
  ],
  exports: [
    ChartsReportsModuleModule
  ]
})
export class BarChartReportSellBySellerWeModuleModule { }
