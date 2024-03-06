import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddWarehouseModuleRoutingModule } from './add-warehouse-module-routing.module';

// Component
import { AddWarehouseComponent } from '../../../../main/warehouse/add-warehouse/add-warehouse.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddWarehouseComponent
  ],
  imports: [
    SharedModule,
    AddWarehouseModuleRoutingModule
  ]
})
export class AddWarehouseModuleModule { }
