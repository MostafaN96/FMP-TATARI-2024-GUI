import { NgModule } from '@angular/core';

// Routing Module
import { PieChartReportSellBySellersWeModuleRoutingModule } from './pie-chart-report-sell-by-sellers-we-module-routing.module';

// Component
import { PieChartReportSellBySellersWeComponent } from 'src/app/main/we/reports/pie-chart-report-sell-by-sellers-we/pie-chart-report-sell-by-sellers-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { ChartsReportsModuleModule } from 'src/app/system-modules/main-pages-modules/charts-reports-module/charts-reports-module.module';

@NgModule({
  declarations: [
    PieChartReportSellBySellersWeComponent
  ],
  imports: [
    SharedModule,
    PieChartReportSellBySellersWeModuleRoutingModule,
    ChartsReportsModuleModule
  ],
  exports: [
    ChartsReportsModuleModule
  ]
})
export class PieChartReportSellBySellersWeModuleModule { }
