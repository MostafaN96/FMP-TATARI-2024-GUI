import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllReconcilitionRequisitionWeModuleRoutingModule } from './show-all-reconcilition-requisition-we-module-routing.module';

// Component
import { ShowAllReconcilitionRequisitionWeComponent } from '../../../../../main/we/reconcilition-requisition-we/show-all-reconcilition-requisition-we/show-all-reconcilition-requisition-we.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllReconcilitionRequisitionWeComponent
  ],
  imports: [
    SharedModule,
    ShowAllReconcilitionRequisitionWeModuleRoutingModule
  ]
})
export class ShowAllReconcilitionRequisitionWeModuleModule { }
