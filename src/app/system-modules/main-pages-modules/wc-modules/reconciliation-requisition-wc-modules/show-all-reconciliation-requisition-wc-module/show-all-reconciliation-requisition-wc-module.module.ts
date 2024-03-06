import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllReconciliationRequisitionWcModuleRoutingModule } from './show-all-reconciliation-requisition-wc-module-routing.module';

// Component
import { ShowAllReconciliationRequisitionWcComponent } from '../../../../../main/wc/reconciliation-requisition-wc/show-all-reconciliation-requisition-wc/show-all-reconciliation-requisition-wc.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllReconciliationRequisitionWcComponent
  ],
  imports: [
    SharedModule,
    ShowAllReconciliationRequisitionWcModuleRoutingModule
  ]
})
export class ShowAllReconciliationRequisitionWcModuleModule { }
