import { NgModule } from '@angular/core';

import { AddReconcilitionRequisitionWeModuleRoutingModule } from './add-reconcilition-requisition-we-module-routing.module';

// Component
import { AddReconcilitionRequisitionWeComponent } from '../../../../../main/we/reconcilition-requisition-we/add-reconcilition-requisition-we/add-reconcilition-requisition-we.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    AddReconcilitionRequisitionWeComponent
  ],
  imports: [
    SharedModule,
    AddReconcilitionRequisitionWeModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class AddReconcilitionRequisitionWeModuleModule { }
