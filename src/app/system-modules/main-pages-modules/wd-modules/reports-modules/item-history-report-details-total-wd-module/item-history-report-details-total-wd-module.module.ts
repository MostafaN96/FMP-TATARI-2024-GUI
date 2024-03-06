import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryReportDetailsTotalWdModuleRoutingModule } from './item-history-report-details-total-wd-module-routing.module';

// Component
import { ItemHistoryReportDetailsTotalWdComponent } from 'src/app/main/wd/reports/item-history-report-details-total-wd/item-history-report-details-total-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ItemHistoryReportDetailsTotalWdComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryReportDetailsTotalWdModuleRoutingModule
  ]
})
export class ItemHistoryReportDetailsTotalWdModuleModule { }
