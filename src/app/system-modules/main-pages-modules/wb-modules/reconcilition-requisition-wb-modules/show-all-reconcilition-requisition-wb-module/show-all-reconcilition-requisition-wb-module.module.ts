import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllReconcilitionRequisitionWbModuleRoutingModule } from './show-all-reconcilition-requisition-wb-module-routing.module';

// Component
import { ShowAllReconcilitionRequisitionWbComponent } from '../../../../../main/wb/reconcilition-requisition-wb/show-all-reconcilition-requisition-wb/show-all-reconcilition-requisition-wb.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllReconcilitionRequisitionWbComponent
  ],
  imports: [
    SharedModule,
    ShowAllReconcilitionRequisitionWbModuleRoutingModule
  ]
})
export class ShowAllReconcilitionRequisitionWbModuleModule { }
