import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryReportWbModuleRoutingModule } from './item-history-report-wb-module-routing.module';

// Component
import { ItemHistoryReportWbComponent } from '../../../../../main/wb/reports/item-history-report-wb/item-history-report-wb/item-history-report-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Child Component
import { ItemHistoryTotalReportWbComponent } from '../../../../../main/wb/reports/item-history-report-wb/item-history-total-report-wb/item-history-total-report-wb.component';

@NgModule({
  declarations: [
    ItemHistoryReportWbComponent,
    ItemHistoryTotalReportWbComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryReportWbModuleRoutingModule
  ]
})
export class ItemHistoryReportWbModuleModule { }
