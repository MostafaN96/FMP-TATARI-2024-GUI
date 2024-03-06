import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllReconciliationRequisitionWaModuleRoutingModule } from './show-all-reconciliation-requisition-wa-module-routing.module';

// Component
import { ShowAllReconciliationRequisitionWaComponent } from '../../../../../main/wa/reconciliation-requisition-wa/show-all-reconciliation-requisition-wa/show-all-reconciliation-requisition-wa.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllReconciliationRequisitionWaComponent
  ],
  imports: [
    SharedModule,
    ShowAllReconciliationRequisitionWaModuleRoutingModule
  ]
})
export class ShowAllReconciliationRequisitionWaModuleModule { }
