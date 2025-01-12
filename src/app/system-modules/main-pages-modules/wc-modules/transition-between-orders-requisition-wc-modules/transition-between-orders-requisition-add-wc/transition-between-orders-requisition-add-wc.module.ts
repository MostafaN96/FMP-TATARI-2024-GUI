import { NgModule } from '@angular/core';

// Routing Module
import { TransitionBetweenOrdersRequisitionAddWcRoutingModule } from './transition-between-orders-requisition-add-wc-routing.module';

// Component
import { AddTransitionBetweenOrdersRequisitionWcComponent } from 'src/app/main/wc/transition-between-orders-requisition-wc/add-transition-between-orders-requisition-wc/add-transition-between-orders-requisition-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddTransitionBetweenOrdersRequisitionWcComponent
  ],
  imports: [
    SharedModule,
    TransitionBetweenOrdersRequisitionAddWcRoutingModule
  ]
})
export class TransitionBetweenOrdersRequisitionAddWcModule { }
