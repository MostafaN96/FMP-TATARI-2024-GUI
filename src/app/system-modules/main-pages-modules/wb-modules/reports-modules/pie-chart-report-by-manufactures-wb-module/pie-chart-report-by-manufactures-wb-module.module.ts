import { NgModule } from '@angular/core';

// Routing Module
import { PieChartReportByManufacturesWbModuleRoutingModule } from './pie-chart-report-by-manufactures-wb-module-routing.module';

// Component
import { PieChartReportByManufacturesWbComponent } from 'src/app/main/wb/reports/pie-chart-report-by-manufactures-wb/pie-chart-report-by-manufactures-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { ChartsReportsModuleModule } from 'src/app/system-modules/main-pages-modules/charts-reports-module/charts-reports-module.module';

@NgModule({
  declarations: [
    PieChartReportByManufacturesWbComponent
  ],
  imports: [
    SharedModule,
    PieChartReportByManufacturesWbModuleRoutingModule,
    ChartsReportsModuleModule
  ],
  exports: [
    ChartsReportsModuleModule
  ]
})
export class PieChartReportByManufacturesWbModuleModule { }
