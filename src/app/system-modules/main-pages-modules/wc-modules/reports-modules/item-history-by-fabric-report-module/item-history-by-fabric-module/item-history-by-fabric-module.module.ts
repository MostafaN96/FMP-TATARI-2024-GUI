import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryByFabricModuleRoutingModule } from './item-history-by-fabric-module-routing.module';

// Component
import { ItemHistoryByFabricComponent } from 'src/app/main/wc/reports/item-history-by-fabric-report/item-history-by-fabric/item-history-by-fabric.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Child Component
import { ItemHistoryByFabricTotalWcComponent } from 'src/app/main/wc/reports/item-history-by-fabric-report/item-history-by-fabric-total-wc/item-history-by-fabric-total-wc.component';
import { WcInputDetailsDialogComponent } from 'src/app/main/wc/reports/item-history-by-fabric-report/wc-input-details-dialog/wc-input-details-dialog.component';

@NgModule({
  declarations: [
    ItemHistoryByFabricComponent,
    ItemHistoryByFabricTotalWcComponent,
    WcInputDetailsDialogComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryByFabricModuleRoutingModule
  ]
})
export class ItemHistoryByFabricModuleModule { }
