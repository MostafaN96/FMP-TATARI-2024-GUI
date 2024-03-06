import { NgModule } from '@angular/core';

// Routing Module
import { ReconcilitionRequisitionDetailsWbModuleRoutingModule } from './reconcilition-requisition-details-wb-module-routing.module';

// Component
import { ReconcilitionRequisitionDetailsWbComponent } from 'src/app/main/wb/reconcilition-requisition-wb/reconcilition-requisition-details-wb/reconcilition-requisition-details-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { WbReconciliationRequisitionFormAddDetailsComponent } from 'src/app/main/wb/reconcilition-requisition-wb/wb-reconciliation-requisition-form-add-details/wb-reconciliation-requisition-form-add-details.component';
import { WbReconciliationRequisitionUpdateComponent } from 'src/app/main/wb/reconcilition-requisition-wb/wb-reconciliation-requisition-update/wb-reconciliation-requisition-update.component';

@NgModule({
  declarations: [
    ReconcilitionRequisitionDetailsWbComponent,
    WbReconciliationRequisitionFormAddDetailsComponent,
    WbReconciliationRequisitionUpdateComponent
  ],
  imports: [
    SharedModule,
    ReconcilitionRequisitionDetailsWbModuleRoutingModule
  ]
})
export class ReconcilitionRequisitionDetailsWbModuleModule { }
