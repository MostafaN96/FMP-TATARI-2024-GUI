import { NgModule } from '@angular/core';

// Routing Module
import { ItemHostoryByDyedFabricDetailsTotalWeRoutingModule } from './item-hostory-by-dyed-fabric-details-total-we-routing.module';

// Component
import { ItemHostoryByDyedFabricDetailsTotalWeComponent } from 'src/app/main/we/reports/item-hostory-by-dyed-fabric-details-total-we/item-hostory-by-dyed-fabric-details-total-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ItemHostoryByDyedFabricDetailsTotalWeComponent,
  ],
  imports: [
    SharedModule,
    ItemHostoryByDyedFabricDetailsTotalWeRoutingModule
  ]
})
export class ItemHostoryByDyedFabricDetailsTotalWeModule { }
