import { NgModule } from '@angular/core';

// Routing Module
import { PieChartReportByDeiersWdModuleRoutingModule } from './pie-chart-report-by-deiers-wd-module-routing.module';

// Component
import { PieChartReportByDeiersWdComponent } from 'src/app/main/wd/reports/pie-chart-report-by-deiers-wd/pie-chart-report-by-deiers-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { ChartsReportsModuleModule } from 'src/app/system-modules/main-pages-modules/charts-reports-module/charts-reports-module.module';

@NgModule({
  declarations: [
    PieChartReportByDeiersWdComponent
  ],
  imports: [
    SharedModule,
    PieChartReportByDeiersWdModuleRoutingModule,
    ChartsReportsModuleModule
  ],
  exports: [
    ChartsReportsModuleModule
  ]
})
export class PieChartReportByDeiersWdModuleModule { }
