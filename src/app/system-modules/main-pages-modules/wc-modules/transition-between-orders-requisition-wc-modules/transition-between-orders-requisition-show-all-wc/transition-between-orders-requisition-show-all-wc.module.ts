import { NgModule } from '@angular/core';

// Routing Module
import { TransitionBetweenOrdersRequisitionShowAllWcRoutingModule } from './transition-between-orders-requisition-show-all-wc-routing.module';

// Component
import { TransitionBetweenOrdersRequisitionShowAllWcComponent } from 'src/app/main/wc/transition-between-orders-requisition-wc/transition-between-orders-requisition-show-all-wc/transition-between-orders-requisition-show-all-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    TransitionBetweenOrdersRequisitionShowAllWcComponent
  ],
  imports: [
    SharedModule,
    TransitionBetweenOrdersRequisitionShowAllWcRoutingModule
  ]
})
export class TransitionBetweenOrdersRequisitionShowAllWcModule { }
