import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddConsigmentManufacturingModuleRoutingModule } from './add-consigment-manufacturing-module-routing.module';

// Component
import { AddConsigmentManufacturingComponent } from 'src/app/main/consigment-manufacturing/add-consigment-manufacturing/add-consigment-manufacturing.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddConsigmentManufacturingComponent
  ],
  imports: [
    SharedModule,
    AddConsigmentManufacturingModuleRoutingModule
  ]
})
export class AddConsigmentManufacturingModuleModule { }
