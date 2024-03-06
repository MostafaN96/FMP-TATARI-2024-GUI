import { NgModule } from '@angular/core';

// Routing Module
import { PieChartReportBySuppliersWaModuleRoutingModule } from './pie-chart-report-by-suppliers-wa-module-routing.module';

// Component
import { PieChartReportBySuppliersWaComponent } from 'src/app/main/wa/reports/pie-chart-report-by-suppliers-wa/pie-chart-report-by-suppliers-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { ChartsReportsModuleModule } from 'src/app/system-modules/main-pages-modules/charts-reports-module/charts-reports-module.module';

@NgModule({
  declarations: [
    PieChartReportBySuppliersWaComponent
  ],
  imports: [
    SharedModule,
    PieChartReportBySuppliersWaModuleRoutingModule,
    ChartsReportsModuleModule
  ],
  exports: [
    ChartsReportsModuleModule
  ]
})
export class PieChartReportBySuppliersWaModuleModule { }
