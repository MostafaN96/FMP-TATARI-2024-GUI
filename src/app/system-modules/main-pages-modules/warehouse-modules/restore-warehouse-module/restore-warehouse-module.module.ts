import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreWarehouseModuleRoutingModule } from './restore-warehouse-module-routing.module';

// Component
import { RestoreWarehouseComponent } from '../../../../main/warehouse/restore-warehouse/restore-warehouse.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreWarehouseComponent
  ],
  imports: [
    SharedModule,
    RestoreWarehouseModuleRoutingModule
  ]
})
export class RestoreWarehouseModuleModule { }
