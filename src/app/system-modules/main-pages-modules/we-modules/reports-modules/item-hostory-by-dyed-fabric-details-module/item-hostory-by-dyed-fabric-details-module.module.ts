import { NgModule } from '@angular/core';

// Routing Module
import { ItemHostoryByDyedFabricDetailsModuleRoutingModule } from './item-hostory-by-dyed-fabric-details-module-routing.module';

// Component
import { ItemHostoryByDyedFabricDetailsComponent } from '../../../../../main/we/reports/item-hostory-by-dyed-fabric-details/item-hostory-by-dyed-fabric-details.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ItemHostoryByDyedFabricDetailsComponent
  ],
  imports: [
    SharedModule,
    ItemHostoryByDyedFabricDetailsModuleRoutingModule
  ]
})
export class ItemHostoryByDyedFabricDetailsModuleModule { }
