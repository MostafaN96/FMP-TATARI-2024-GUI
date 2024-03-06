import { NgModule } from '@angular/core';

import { DailyReportByDateTotalModuleRoutingModule } from './daily-report-by-date-total-module-routing.module';

// Component
import { DailyReportByDateTotalComponent } from 'src/app/main/reports/daily-report-by-date-total/daily-report-by-date-total.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    DailyReportByDateTotalComponent,
  ],
  imports: [
    SharedModule,
    DailyReportByDateTotalModuleRoutingModule
  ]
})
export class DailyReportByDateTotalModuleModule { }
