import { NgModule } from '@angular/core';

import { AddCircularKnittingMachineModuleRoutingModule } from './add-circular-knitting-machine-module-routing.module';

// Component
import { AddCircularKnittingMachineComponent } from 'src/app/main/circular-knitting-machine/add-circular-knitting-machine/add-circular-knitting-machine.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddCircularKnittingMachineComponent
  ],
  imports: [
    SharedModule,
    AddCircularKnittingMachineModuleRoutingModule
  ]
})
export class AddCircularKnittingMachineModuleModule { }
