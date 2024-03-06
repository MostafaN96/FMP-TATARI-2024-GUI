import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreConsigmentManufacturingModuleRoutingModule } from './restore-consigment-manufacturing-module-routing.module';

// Component
import { RestoreConsigmentManufacturingComponent } from 'src/app/main/consigment-manufacturing/restore-consigment-manufacturing/restore-consigment-manufacturing.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreConsigmentManufacturingComponent
  ],
  imports: [
    SharedModule,
    RestoreConsigmentManufacturingModuleRoutingModule
  ]
})
export class RestoreConsigmentManufacturingModuleModule { }
