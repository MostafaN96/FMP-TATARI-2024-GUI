import { NgModule } from '@angular/core';

// Routing Module
import { ReconcilitionRequisitionDetailsWdModuleRoutingModule } from './reconcilition-requisition-details-wd-module-routing.module';

// Component
import { ReconcilitionRequisitionDetailsWdComponent } from 'src/app/main/wd/reconcilition-requisition-wd/reconcilition-requisition-details-wd/reconcilition-requisition-details-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { WdReconciliationRequisitionFormAddDetailsComponent } from 'src/app/main/wd/reconcilition-requisition-wd/wd-reconciliation-requisition-form-add-details/wd-reconciliation-requisition-form-add-details.component';
import { WdReconciliationRequisitionUpdateComponent } from 'src/app/main/wd/reconcilition-requisition-wd/wd-reconciliation-requisition-update/wd-reconciliation-requisition-update.component';

@NgModule({
  declarations: [
    ReconcilitionRequisitionDetailsWdComponent,
    WdReconciliationRequisitionFormAddDetailsComponent,
    WdReconciliationRequisitionUpdateComponent
  ],
  imports: [
    SharedModule,
    ReconcilitionRequisitionDetailsWdModuleRoutingModule
  ]
})
export class ReconcilitionRequisitionDetailsWdModuleModule { }
