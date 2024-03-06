import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllFabricModuleRoutingModule } from './show-all-fabric-module-routing.module';

// Component
import { ShowAllFabricComponent } from '../../../../main/fabric/show-all-fabric/show-all-fabric.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateFabricComponent } from '../../../../main/fabric/update-fabric/update-fabric.component';

// Shared Components
// import { FabricSharedComponentModule } from 'src/app/system-modules/main-pages-modules/fabric-modules/fabric-shared-component/fabric-shared-component.module';

@NgModule({
  declarations: [
    ShowAllFabricComponent,
    UpdateFabricComponent
  ],
  imports: [
    SharedModule,
    ShowAllFabricModuleRoutingModule,
    // FabricSharedComponentModule
  ],
  exports: [
    // FabricSharedComponentModule
  ]
})
export class ShowAllFabricModuleModule { }
