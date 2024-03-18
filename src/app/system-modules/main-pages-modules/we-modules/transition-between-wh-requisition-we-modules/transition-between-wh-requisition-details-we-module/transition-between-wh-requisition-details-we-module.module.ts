import { NgModule } from '@angular/core';

// Routing Module
import { TransitionBetweenWhRequisitionDetailsWeModuleRoutingModule } from './transition-between-wh-requisition-details-we-module-routing.module';

// Component
import { TransitionBetweenWhRequisitionDetailsWeComponent } from 'src/app/main/we/transition-between-wh-requisition-we/transition-between-wh-requisition-details-we/transition-between-wh-requisition-details-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { AddTransitionBetweenWhRequisitionFormWeComponent } from 'src/app/main/we/transition-between-wh-requisition-we/add-transition-between-wh-requisition-form-we/add-transition-between-wh-requisition-form-we.component';
import { UpdateTransitionBetweenWhRequisitionWeComponent } from 'src/app/main/we/transition-between-wh-requisition-we/update-transition-between-wh-requisition-we/update-transition-between-wh-requisition-we.component';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    TransitionBetweenWhRequisitionDetailsWeComponent,
    AddTransitionBetweenWhRequisitionFormWeComponent,
    UpdateTransitionBetweenWhRequisitionWeComponent
  ],
  imports: [
    SharedModule,
    TransitionBetweenWhRequisitionDetailsWeModuleRoutingModule,
    SharedComponentsModule,
  ],
  exports: [
    SharedComponentsModule,
  ]
})
export class TransitionBetweenWhRequisitionDetailsWeModuleModule { }
