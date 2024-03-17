import { NgModule } from '@angular/core';

// Routing Module
import { ExecuteOrderRequisitionDetailsWeModuleRoutingModule } from './execute-order-requisition-details-we-module-routing.module';

// Component
import { ExecuteOrderRequisitionDetailsWeComponent } from 'src/app/main/we/execute-order-requisition-we/execute-order-requisition-details-we/execute-order-requisition-details-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { ExecuteOrderRequisitionAddDetailsFormWeComponent } from 'src/app/main/we/execute-order-requisition-we/execute-order-requisition-add-details-form-we/execute-order-requisition-add-details-form-we.component';
import { ExecuteOrderRequisitionUpdateWeComponent } from 'src/app/main/we/execute-order-requisition-we/execute-order-requisition-update-we/execute-order-requisition-update-we.component';

@NgModule({
  declarations: [
    ExecuteOrderRequisitionDetailsWeComponent,
    ExecuteOrderRequisitionAddDetailsFormWeComponent,
    ExecuteOrderRequisitionUpdateWeComponent
  ],
  imports: [
    SharedModule,
    ExecuteOrderRequisitionDetailsWeModuleRoutingModule
  ]
})
export class ExecuteOrderRequisitionDetailsWeModuleModule { }
