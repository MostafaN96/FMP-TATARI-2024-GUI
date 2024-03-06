import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryByYarnDetailsTotalWaModuleRoutingModule } from './item-history-by-yarn-details-total-wa-module-routing.module';

// Component
import { ItemHistoryByYarnDetailsTotalWaComponent } from 'src/app/main/wa/reports/item-history-by-yarn-report/item-history-by-yarn-details-total-wa/item-history-by-yarn-details-total-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ItemHistoryByYarnDetailsTotalWaComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryByYarnDetailsTotalWaModuleRoutingModule
  ]
})
export class ItemHistoryByYarnDetailsTotalWaModuleModule { }
