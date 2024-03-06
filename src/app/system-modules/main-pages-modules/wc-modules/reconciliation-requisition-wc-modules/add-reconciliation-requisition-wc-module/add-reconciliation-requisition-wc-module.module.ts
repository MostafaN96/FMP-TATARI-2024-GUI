import { NgModule } from '@angular/core';

// Routing Module
import { AddReconciliationRequisitionWcModuleRoutingModule } from './add-reconciliation-requisition-wc-module-routing.module';

// Component
import { AddReconciliationRequisitionWcComponent } from '../../../../../main/wc/reconciliation-requisition-wc/add-reconciliation-requisition-wc/add-reconciliation-requisition-wc.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddReconciliationRequisitionWcComponent
  ],
  imports: [
    SharedModule,
    AddReconciliationRequisitionWcModuleRoutingModule
  ]
})
export class AddReconciliationRequisitionWcModuleModule { }
