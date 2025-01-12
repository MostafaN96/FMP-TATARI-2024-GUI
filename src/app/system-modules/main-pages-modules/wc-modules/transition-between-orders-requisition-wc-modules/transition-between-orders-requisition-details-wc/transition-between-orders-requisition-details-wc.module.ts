import { NgModule } from '@angular/core';

// Routing Module
import { TransitionBetweenOrdersRequisitionDetailsWcRoutingModule } from './transition-between-orders-requisition-details-wc-routing.module';

// Component
import { TransitionBetweenOrdersRequisitionDetailsWcComponent } from 'src/app/main/wc/transition-between-orders-requisition-wc/transition-between-orders-requisition-details-wc/transition-between-orders-requisition-details-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { AddTransitionBetweenOrdersRequisitionFormWcComponent } from 'src/app/main/wc/transition-between-orders-requisition-wc/add-transition-between-orders-requisition-form-wc/add-transition-between-orders-requisition-form-wc.component';
import { TransitionBetweenOrdersRequisitionUpdateWcComponent } from 'src/app/main/wc/transition-between-orders-requisition-wc/transition-between-orders-requisition-update-wc/transition-between-orders-requisition-update-wc.component';

@NgModule({
  declarations: [
    TransitionBetweenOrdersRequisitionDetailsWcComponent,
    AddTransitionBetweenOrdersRequisitionFormWcComponent,
    TransitionBetweenOrdersRequisitionUpdateWcComponent
  ],
  imports: [
    SharedModule,
    TransitionBetweenOrdersRequisitionDetailsWcRoutingModule
  ]
})
export class TransitionBetweenOrdersRequisitionDetailsWcModule { }
