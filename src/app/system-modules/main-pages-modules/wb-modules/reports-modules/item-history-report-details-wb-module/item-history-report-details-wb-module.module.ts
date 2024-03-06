import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryReportDetailsWbModuleRoutingModule } from './item-history-report-details-wb-module-routing.module';

// Component
import { ItemHistoryReportDetailsWbComponent } from '../../../../../main/wb/reports/item-history-report-wb/item-history-report-details-wb/item-history-report-details-wb.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ItemHistoryReportDetailsWbComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryReportDetailsWbModuleRoutingModule
  ]
})
export class ItemHistoryReportDetailsWbModuleModule { }
