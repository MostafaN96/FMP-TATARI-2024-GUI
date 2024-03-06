import { NgModule } from '@angular/core';

import { ShowAllCircularKnittingMachineModuleRoutingModule } from './show-all-circular-knitting-machine-module-routing.module';

// Component
import { ShowAllCircularKnittingMachineComponent } from 'src/app/main/circular-knitting-machine/show-all-circular-knitting-machine/show-all-circular-knitting-machine.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateCircularKnittingMachineComponent } from 'src/app/main/circular-knitting-machine/update-circular-knitting-machine/update-circular-knitting-machine.component';

@NgModule({
  declarations: [
    ShowAllCircularKnittingMachineComponent,
    UpdateCircularKnittingMachineComponent
  ],
  imports: [
    SharedModule,
    ShowAllCircularKnittingMachineModuleRoutingModule
  ]
})
export class ShowAllCircularKnittingMachineModuleModule { }
