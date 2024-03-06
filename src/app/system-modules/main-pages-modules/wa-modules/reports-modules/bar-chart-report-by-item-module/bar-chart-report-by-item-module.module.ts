import { NgModule } from '@angular/core';

// Routing Module
import { BarChartReportByItemModuleRoutingModule } from './bar-chart-report-by-item-module-routing.module';

// Component
import { BarChartReportByItemWaComponent } from 'src/app/main/wa/reports/bar-chart-report-by-item-wa/bar-chart-report-by-item-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { ChartsReportsModuleModule } from 'src/app/system-modules/main-pages-modules/charts-reports-module/charts-reports-module.module';

@NgModule({
  declarations: [
    BarChartReportByItemWaComponent
  ],
  imports: [
    SharedModule,
    BarChartReportByItemModuleRoutingModule,
    ChartsReportsModuleModule
  ],
  exports: [
    ChartsReportsModuleModule
  ]
})
export class BarChartReportByItemModuleModule { }
