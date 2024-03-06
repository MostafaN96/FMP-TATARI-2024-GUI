import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryByFabricDetailsTotalWcRoutingModule } from './item-history-by-fabric-details-total-wc-routing.module';

// Component
import { ItemHistoryByFabricDetailsTotalWcComponent } from 'src/app/main/wc/reports/item-history-by-fabric-report/item-history-by-fabric-details-total-wc/item-history-by-fabric-details-total-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ItemHistoryByFabricDetailsTotalWcComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryByFabricDetailsTotalWcRoutingModule
  ]
})
export class ItemHistoryByFabricDetailsTotalWcModule { }
