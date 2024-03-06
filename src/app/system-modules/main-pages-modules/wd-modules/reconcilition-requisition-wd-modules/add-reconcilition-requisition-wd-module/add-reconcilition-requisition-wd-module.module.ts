import { NgModule } from '@angular/core';

// Routing Module
import { AddReconcilitionRequisitionWdModuleRoutingModule } from './add-reconcilition-requisition-wd-module-routing.module';

// Component
import { AddReconcilitionRequisitionWdComponent } from '../../../../../main/wd/reconcilition-requisition-wd/add-reconcilition-requisition-wd/add-reconcilition-requisition-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddReconcilitionRequisitionWdComponent
  ],
  imports: [
    SharedModule,
    AddReconcilitionRequisitionWdModuleRoutingModule
  ]
})
export class AddReconcilitionRequisitionWdModuleModule { }
