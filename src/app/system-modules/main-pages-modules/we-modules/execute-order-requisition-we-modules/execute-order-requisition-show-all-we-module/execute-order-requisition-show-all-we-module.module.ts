import { NgModule } from '@angular/core';

// Routing Module
import { ExecuteOrderRequisitionShowAllWeModuleRoutingModule } from './execute-order-requisition-show-all-we-module-routing.module';

// Component
import { ExecuteOrderRequisitionShowAllWeComponent } from 'src/app/main/we/execute-order-requisition-we/execute-order-requisition-show-all-we/execute-order-requisition-show-all-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ExecuteOrderRequisitionShowAllWeComponent
  ],
  imports: [
    SharedModule,
    ExecuteOrderRequisitionShowAllWeModuleRoutingModule
  ]
})
export class ExecuteOrderRequisitionShowAllWeModuleModule { }
