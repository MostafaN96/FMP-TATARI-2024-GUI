import { NgModule } from '@angular/core';

import { RestoreCircularKnittingMachineModuleRoutingModule } from './restore-circular-knitting-machine-module-routing.module';

// Component
import { RestoreCircularKnittingMachineComponent } from 'src/app/main/circular-knitting-machine/restore-circular-knitting-machine/restore-circular-knitting-machine.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreCircularKnittingMachineComponent
  ],
  imports: [
    SharedModule,
    RestoreCircularKnittingMachineModuleRoutingModule
  ]
})
export class RestoreCircularKnittingMachineModuleModule { }
