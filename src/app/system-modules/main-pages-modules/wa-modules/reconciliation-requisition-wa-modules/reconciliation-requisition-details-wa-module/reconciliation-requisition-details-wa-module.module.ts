import { NgModule } from '@angular/core';

// Routing Module
import { ReconciliationRequisitionDetailsWaModuleRoutingModule } from './reconciliation-requisition-details-wa-module-routing.module';

// Component
import { ReconciliationRequisitionDetailsWaComponent } from 'src/app/main/wa/reconciliation-requisition-wa/reconciliation-requisition-details-wa/reconciliation-requisition-details-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { WaReconciliationRequisitionUpdateComponent } from 'src/app/main/wa/reconciliation-requisition-wa/wa-reconciliation-requisition-update/wa-reconciliation-requisition-update.component';
import { WaReconciliationRequisitionFormAddDetailsComponent } from 'src/app/main/wa/reconciliation-requisition-wa/wa-reconciliation-requisition-form-add-details/wa-reconciliation-requisition-form-add-details.component';

@NgModule({
  declarations: [
    ReconciliationRequisitionDetailsWaComponent,
    WaReconciliationRequisitionUpdateComponent,
    WaReconciliationRequisitionFormAddDetailsComponent
  ],
  imports: [
    SharedModule,
    ReconciliationRequisitionDetailsWaModuleRoutingModule
  ]
})
export class ReconciliationRequisitionDetailsWaModuleModule { }
