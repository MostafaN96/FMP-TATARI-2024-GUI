import { NgModule } from '@angular/core';

// Routing Module
import { ExecuteOrderRequisitionShowAllWcModuleRoutingModule } from './execute-order-requisition-show-all-wc-module-routing.module';

// Component
import { ExecuteOrderRequisitionShowAllWcComponent } from 'src/app/main/wc/execute-order-requisition-wc/execute-order-requisition-show-all-wc/execute-order-requisition-show-all-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ExecuteOrderRequisitionShowAllWcComponent
  ],
  imports: [
    SharedModule,
    ExecuteOrderRequisitionShowAllWcModuleRoutingModule
  ]
})
export class ExecuteOrderRequisitionShowAllWcModuleModule { }
