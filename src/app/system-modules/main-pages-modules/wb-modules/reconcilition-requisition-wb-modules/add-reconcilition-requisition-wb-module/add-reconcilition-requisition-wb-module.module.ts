import { NgModule } from '@angular/core';

// Routing Module
import { AddReconcilitionRequisitionWbModuleRoutingModule } from './add-reconcilition-requisition-wb-module-routing.module';

// Component
import { AddReconcilitionRequisitionWbComponent } from '../../../../../main/wb/reconcilition-requisition-wb/add-reconcilition-requisition-wb/add-reconcilition-requisition-wb.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddReconcilitionRequisitionWbComponent
  ],
  imports: [
    SharedModule,
    AddReconcilitionRequisitionWbModuleRoutingModule
  ]
})
export class AddReconcilitionRequisitionWbModuleModule { }
