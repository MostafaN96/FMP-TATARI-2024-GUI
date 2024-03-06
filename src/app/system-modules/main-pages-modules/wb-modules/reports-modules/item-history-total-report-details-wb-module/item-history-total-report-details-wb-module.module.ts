import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryTotalReportDetailsWbModuleRoutingModule } from './item-history-total-report-details-wb-module-routing.module';

// Component
import { ItemHistoryTotalReportDetailsWbComponent } from 'src/app/main/wb/reports/item-history-report-wb/item-history-total-report-details-wb/item-history-total-report-details-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ItemHistoryTotalReportDetailsWbComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryTotalReportDetailsWbModuleRoutingModule
  ]
})
export class ItemHistoryTotalReportDetailsWbModuleModule { }
