import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryByFabricDetailsModuleRoutingModule } from './item-history-by-fabric-details-module-routing.module';

// Component
import { ItemHistoryByFabricDetailsComponent } from 'src/app/main/wc/reports/item-history-by-fabric-report/item-history-by-fabric-details/item-history-by-fabric-details.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ItemHistoryByFabricDetailsComponent,
  ],
  imports: [
    SharedModule,
    ItemHistoryByFabricDetailsModuleRoutingModule
  ]
})
export class ItemHistoryByFabricDetailsModuleModule { }
