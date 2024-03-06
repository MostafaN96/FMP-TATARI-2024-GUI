import { NgModule } from '@angular/core';

// Routing Module
import { AddReconciliationRequisitionWaModuleRoutingModule } from './add-reconciliation-requisition-wa-module-routing.module';

// Component
import { AddReconciliationRequisitionWaComponent } from '../../../../../main/wa/reconciliation-requisition-wa/add-reconciliation-requisition-wa/add-reconciliation-requisition-wa.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddReconciliationRequisitionWaComponent
  ],
  imports: [
    SharedModule,
    AddReconciliationRequisitionWaModuleRoutingModule
  ]
})
export class AddReconciliationRequisitionWaModuleModule { }
