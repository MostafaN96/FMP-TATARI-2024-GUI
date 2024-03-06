import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryReportWdModuleRoutingModule } from './item-history-report-wd-module-routing.module';

// Component
import { ItemHistoryReportWdComponent } from 'src/app/main/wd/reports/item-history-report-wd/item-history-report-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Child Component
import { ItemHistoryTotalReportWdComponent } from 'src/app/main/wd/reports/item-history-total-report-wd/item-history-total-report-wd.component';

@NgModule({
  declarations: [
    ItemHistoryReportWdComponent,
    ItemHistoryTotalReportWdComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryReportWdModuleRoutingModule
  ]
})
export class ItemHistoryReportWdModuleModule { }
