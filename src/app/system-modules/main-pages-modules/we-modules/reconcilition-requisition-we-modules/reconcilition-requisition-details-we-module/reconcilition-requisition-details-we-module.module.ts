import { NgModule } from '@angular/core';

import { ReconcilitionRequisitionDetailsWeModuleRoutingModule } from './reconcilition-requisition-details-we-module-routing.module';

// Component
import { ReconcilitionRequisitionDetailsWeComponent } from 'src/app/main/we/reconcilition-requisition-we/reconcilition-requisition-details-we/reconcilition-requisition-details-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { WeReconcilitionRequisitionUpdateComponent } from 'src/app/main/we/reconcilition-requisition-we/we-reconcilition-requisition-update/we-reconcilition-requisition-update.component';
import { WeReconcilitionRequisitionFormAddDetailsComponent } from 'src/app/main/we/reconcilition-requisition-we/we-reconcilition-requisition-form-add-details/we-reconcilition-requisition-form-add-details.component';

// Shared Components
import { SharedComponentsModule } from 'src/app/system-modules/main-pages-modules/shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    ReconcilitionRequisitionDetailsWeComponent,
    WeReconcilitionRequisitionUpdateComponent,
    WeReconcilitionRequisitionFormAddDetailsComponent
  ],
  imports: [
    SharedModule,
    ReconcilitionRequisitionDetailsWeModuleRoutingModule,
    SharedComponentsModule,
  ],
  exports: [
    SharedComponentsModule,
  ]
})
export class ReconcilitionRequisitionDetailsWeModuleModule { }
