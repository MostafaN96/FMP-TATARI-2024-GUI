import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryByFabricModuleRoutingModule } from './item-history-by-fabric-module-routing.module';

// Component
import { ItemHistoryByFabricComponent } from 'src/app/main/wc/reports/item-history-by-fabric-report/item-history-by-fabric/item-history-by-fabric.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Child Component
import { ItemHistoryByFabricTotalWcComponent } from 'src/app/main/wc/reports/item-history-by-fabric-report/item-history-by-fabric-total-wc/item-history-by-fabric-total-wc.component';

@NgModule({
  declarations: [
    ItemHistoryByFabricComponent,
    ItemHistoryByFabricTotalWcComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryByFabricModuleRoutingModule
  ]
})
export class ItemHistoryByFabricModuleModule { }
