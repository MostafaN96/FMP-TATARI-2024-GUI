import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryReportDetailsWdModuleRoutingModule } from './item-history-report-details-wd-module-routing.module';

// Component
import { ItemHistoryReportDetailsWdComponent } from 'src/app/main/wd/reports/item-history-report-details-wd/item-history-report-details-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ItemHistoryReportDetailsWdComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryReportDetailsWdModuleRoutingModule
  ]
})
export class ItemHistoryReportDetailsWdModuleModule { }
