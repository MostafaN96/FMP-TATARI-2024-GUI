import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreFabricModuleRoutingModule } from './restore-fabric-module-routing.module';

// Component
import { RestoreFabricComponent } from '../../../../main/fabric/restore-fabric/restore-fabric.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreFabricComponent
  ],
  imports: [
    SharedModule,
    RestoreFabricModuleRoutingModule
  ]
})
export class RestoreFabricModuleModule { }
