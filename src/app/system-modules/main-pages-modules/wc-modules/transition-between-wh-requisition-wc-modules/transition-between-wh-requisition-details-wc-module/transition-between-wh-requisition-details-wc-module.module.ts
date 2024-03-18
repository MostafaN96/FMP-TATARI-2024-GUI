import { NgModule } from '@angular/core';

// Routing Module
import { TransitionBetweenWhRequisitionDetailsWcModuleRoutingModule } from './transition-between-wh-requisition-details-wc-module-routing.module';

// Component
import { TransitionBetweenWhRequisitionDetailsWcComponent } from 'src/app/main/wc/transition-between-wh-requisition-wc/transition-between-wh-requisition-details-wc/transition-between-wh-requisition-details-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { AddTransitionBetweenWhRequisitionFormWcComponent } from 'src/app/main/wc/transition-between-wh-requisition-wc/add-transition-between-wh-requisition-form-wc/add-transition-between-wh-requisition-form-wc.component';
import { TransitionBetweenWhRequisitionUpdateWcComponent } from 'src/app/main/wc/transition-between-wh-requisition-wc/transition-between-wh-requisition-update-wc/transition-between-wh-requisition-update-wc.component';

@NgModule({
  declarations: [
    TransitionBetweenWhRequisitionDetailsWcComponent,
    AddTransitionBetweenWhRequisitionFormWcComponent,
    TransitionBetweenWhRequisitionUpdateWcComponent
  ],
  imports: [
    SharedModule,
    TransitionBetweenWhRequisitionDetailsWcModuleRoutingModule
  ]
})
export class TransitionBetweenWhRequisitionDetailsWcModuleModule { }
