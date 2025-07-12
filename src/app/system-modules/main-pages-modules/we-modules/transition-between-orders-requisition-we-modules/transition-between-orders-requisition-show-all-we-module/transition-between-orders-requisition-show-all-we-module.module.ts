import { NgModule } from '@angular/core';

// Routing Module
import { TransitionBetweenOrdersRequisitionShowAllWeModuleRoutingModule } from './transition-between-orders-requisition-show-all-we-module-routing.module';

// Component
import { TransitionBetweenOrdersRequisitionShowAllWeComponent } from 'src/app/main/we/transition-between-orders-requisition-we/transition-between-orders-requisition-show-all-we/transition-between-orders-requisition-show-all-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    TransitionBetweenOrdersRequisitionShowAllWeComponent
  ],
  imports: [
    SharedModule,
    TransitionBetweenOrdersRequisitionShowAllWeModuleRoutingModule
  ]
})
export class TransitionBetweenOrdersRequisitionShowAllWeModuleModule { }
