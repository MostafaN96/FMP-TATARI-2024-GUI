import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllConsigmentManufacturingModuleRoutingModule } from './show-all-consigment-manufacturing-module-routing.module';

// Component
import { ShowAllConsigmentManufacturingComponent } from 'src/app/main/consigment-manufacturing/show-all-consigment-manufacturing/show-all-consigment-manufacturing.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateConsigmentManufacturingComponent } from 'src/app/main/consigment-manufacturing/update-consigment-manufacturing/update-consigment-manufacturing.component';

@NgModule({
  declarations: [
    ShowAllConsigmentManufacturingComponent,
    UpdateConsigmentManufacturingComponent
  ],
  imports: [
    SharedModule,
    ShowAllConsigmentManufacturingModuleRoutingModule
  ]
})
export class ShowAllConsigmentManufacturingModuleModule { }
