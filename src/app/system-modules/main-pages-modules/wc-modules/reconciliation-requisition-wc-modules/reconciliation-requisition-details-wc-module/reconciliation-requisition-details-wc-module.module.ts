import { NgModule } from '@angular/core';

// Routing Module
import { ReconciliationRequisitionDetailsWcModuleRoutingModule } from './reconciliation-requisition-details-wc-module-routing.module';

// Component
import { ReconciliationRequisitionDetailsWcComponent } from 'src/app/main/wc/reconciliation-requisition-wc/reconciliation-requisition-details-wc/reconciliation-requisition-details-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { WcReconciliationRequisitionUpdateComponent } from 'src/app/main/wc/reconciliation-requisition-wc/wc-reconciliation-requisition-update/wc-reconciliation-requisition-update.component';
import { WcReconciliationRequisitionFormAddDetailsComponent } from 'src/app/main/wc/reconciliation-requisition-wc/wc-reconciliation-requisition-form-add-details/wc-reconciliation-requisition-form-add-details.component';


@NgModule({
  declarations: [
    ReconciliationRequisitionDetailsWcComponent,
    WcReconciliationRequisitionUpdateComponent,
    WcReconciliationRequisitionFormAddDetailsComponent
  ],
  imports: [
    SharedModule,
    ReconciliationRequisitionDetailsWcModuleRoutingModule
  ]
})
export class ReconciliationRequisitionDetailsWcModuleModule { }
