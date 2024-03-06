import { NgModule } from '@angular/core';

// Routing Module
import { ItemHostoryByDyedFabricModuleRoutingModule } from './item-hostory-by-dyed-fabric-module-routing.module';

// Component
import { ItemHostoryByDyedFabricComponent } from 'src/app/main/we/reports/item-hostory-by-dyed-fabric/item-hostory-by-dyed-fabric.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Child Component
import { ItemHostoryByDyedFabricTotalWeComponent } from 'src/app/main/we/reports/item-hostory-by-dyed-fabric-total-we/item-hostory-by-dyed-fabric-total-we.component';

@NgModule({
  declarations: [
    ItemHostoryByDyedFabricComponent,
    ItemHostoryByDyedFabricTotalWeComponent
  ],
  imports: [
    SharedModule,
    ItemHostoryByDyedFabricModuleRoutingModule
  ]
})
export class ItemHostoryByDyedFabricModuleModule { }
