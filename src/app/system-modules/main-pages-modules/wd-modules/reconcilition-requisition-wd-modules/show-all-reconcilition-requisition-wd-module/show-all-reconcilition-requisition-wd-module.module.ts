import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllReconcilitionRequisitionWdModuleRoutingModule } from './show-all-reconcilition-requisition-wd-module-routing.module';

// Component
import { ShowAllReconcilitionRequisitionWdComponent } from '../../../../../main/wd/reconcilition-requisition-wd/show-all-reconcilition-requisition-wd/show-all-reconcilition-requisition-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllReconcilitionRequisitionWdComponent
  ],
  imports: [
    SharedModule,
    ShowAllReconcilitionRequisitionWdModuleRoutingModule
  ]
})
export class ShowAllReconcilitionRequisitionWdModuleModule { }
