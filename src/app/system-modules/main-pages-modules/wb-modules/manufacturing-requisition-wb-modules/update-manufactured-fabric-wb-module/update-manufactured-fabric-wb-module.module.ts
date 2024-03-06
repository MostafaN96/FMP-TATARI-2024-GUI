import { NgModule } from '@angular/core';

// Routing Module
import { UpdateManufacturedFabricWbModuleRoutingModule } from './update-manufactured-fabric-wb-module-routing.module';

// Component
import { UpdateManufacturedFabricWbComponent } from 'src/app/main/wb/manufacturing-requisition-wb/update-manufactured-fabric-wb/update-manufactured-fabric-wb.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    UpdateManufacturedFabricWbComponent
  ],
  imports: [
    SharedModule,
    UpdateManufacturedFabricWbModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class UpdateManufacturedFabricWbModuleModule { }
