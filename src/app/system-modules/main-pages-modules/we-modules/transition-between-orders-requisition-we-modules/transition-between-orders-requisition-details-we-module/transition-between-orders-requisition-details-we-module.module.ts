import { NgModule } from '@angular/core';

// Routing Module
import { TransitionBetweenOrdersRequisitionDetailsWeModuleRoutingModule } from './transition-between-orders-requisition-details-we-module-routing.module';

// Component
import { TransitionBetweenOrdersRequisitionDetailsWeComponent } from 'src/app/main/we/transition-between-orders-requisition-we/transition-between-orders-requisition-details-we/transition-between-orders-requisition-details-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { AddTransitionBetweenOrdersRequisitionFormWeComponent } from 'src/app/main/we/transition-between-orders-requisition-we/add-transition-between-orders-requisition-form-we/add-transition-between-orders-requisition-form-we.component';
import { TransitionBetweenOrdersRequisitionUpdateWeComponent } from 'src/app/main/we/transition-between-orders-requisition-we/transition-between-orders-requisition-update-we/transition-between-orders-requisition-update-we.component';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    TransitionBetweenOrdersRequisitionDetailsWeComponent,
    AddTransitionBetweenOrdersRequisitionFormWeComponent,
    TransitionBetweenOrdersRequisitionUpdateWeComponent
  ],
  imports: [
    SharedModule,
    TransitionBetweenOrdersRequisitionDetailsWeModuleRoutingModule,
    SharedComponentsModule,
  ],
  exports: [
    SharedComponentsModule,
  ]
})
export class TransitionBetweenOrdersRequisitionDetailsWeModuleModule { }
