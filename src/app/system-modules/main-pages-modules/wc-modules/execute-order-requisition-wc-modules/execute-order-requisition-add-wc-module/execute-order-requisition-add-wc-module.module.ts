import { NgModule } from '@angular/core';

// Routing Module
import { ExecuteOrderRequisitionAddWcModuleRoutingModule } from './execute-order-requisition-add-wc-module-routing.module';

// Component
import { ExecuteOrderRequisitionAddWcComponent } from 'src/app/main/wc/execute-order-requisition-wc/execute-order-requisition-add-wc/execute-order-requisition-add-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ExecuteOrderRequisitionAddWcComponent
  ],
  imports: [
    SharedModule,
    ExecuteOrderRequisitionAddWcModuleRoutingModule
  ]
})
export class ExecuteOrderRequisitionAddWcModuleModule { }
