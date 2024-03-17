import { NgModule } from '@angular/core';

// Routing Module
import { ExecuteOrderRequisitionAddWeModuleRoutingModule } from './execute-order-requisition-add-we-module-routing.module';

// Component
import { ExecuteOrderRequisitionAddWeComponent } from 'src/app/main/we/execute-order-requisition-we/execute-order-requisition-add-we/execute-order-requisition-add-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ExecuteOrderRequisitionAddWeComponent
  ],
  imports: [
    SharedModule,
    ExecuteOrderRequisitionAddWeModuleRoutingModule
  ]
})
export class ExecuteOrderRequisitionAddWeModuleModule { }
