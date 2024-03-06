import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllWarehouseModuleRoutingModule } from './show-all-warehouse-module-routing.module';

// Component
import { ShowAllWarehouseComponent } from '../../../../main/warehouse/show-all-warehouse/show-all-warehouse.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateWarehouseComponent } from '../../../../main/warehouse/update-warehouse/update-warehouse.component';

@NgModule({
  declarations: [
    ShowAllWarehouseComponent,
    UpdateWarehouseComponent
  ],
  imports: [
    SharedModule,
    ShowAllWarehouseModuleRoutingModule
  ]
})
export class ShowAllWarehouseModuleModule { }
