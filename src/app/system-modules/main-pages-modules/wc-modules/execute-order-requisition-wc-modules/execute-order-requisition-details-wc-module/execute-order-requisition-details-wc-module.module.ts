import { NgModule } from '@angular/core';

// Routing Module
import { ExecuteOrderRequisitionDetailsWcModuleRoutingModule } from './execute-order-requisition-details-wc-module-routing.module';

// Component
import { ExecuteOrderRequisitionDetailsWcComponent } from 'src/app/main/wc/execute-order-requisition-wc/execute-order-requisition-details-wc/execute-order-requisition-details-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { ExecuteOrderRequisitionAddDetailsFormWcComponent } from 'src/app/main/wc/execute-order-requisition-wc/execute-order-requisition-add-details-form-wc/execute-order-requisition-add-details-form-wc.component';
import { ExecuteOrderRequisitionUpdateWcComponent } from 'src/app/main/wc/execute-order-requisition-wc/execute-order-requisition-update-wc/execute-order-requisition-update-wc.component';

@NgModule({
  declarations: [
    ExecuteOrderRequisitionDetailsWcComponent,
    ExecuteOrderRequisitionAddDetailsFormWcComponent,
    ExecuteOrderRequisitionUpdateWcComponent
  ],
  imports: [
    SharedModule,
    ExecuteOrderRequisitionDetailsWcModuleRoutingModule
  ]
})
export class ExecuteOrderRequisitionDetailsWcModuleModule { }
