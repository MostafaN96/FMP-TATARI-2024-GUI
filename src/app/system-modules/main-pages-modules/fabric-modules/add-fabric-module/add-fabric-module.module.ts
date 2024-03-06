import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddFabricModuleRoutingModule } from './add-fabric-module-routing.module';

// Component
import { AddFabricComponent } from '../../../../main/fabric/add-fabric/add-fabric.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Shared Components
import { FabricSharedComponentModule } from 'src/app/system-modules/main-pages-modules/fabric-modules/fabric-shared-component/fabric-shared-component.module';

@NgModule({
  declarations: [
    AddFabricComponent
  ],
  imports: [
    SharedModule,
    AddFabricModuleRoutingModule,
    FabricSharedComponentModule
  ],
  exports: [
    FabricSharedComponentModule
  ]
})
export class AddFabricModuleModule { }
