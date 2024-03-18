import { NgModule } from '@angular/core';

// Routing Module
import { TransitionBetweenWhRequisitionAddWcModuleRoutingModule } from './transition-between-wh-requisition-add-wc-module-routing.module';

// Component
import { AddTransitionBetweenWhRequisitionWcComponent } from 'src/app/main/wc/transition-between-wh-requisition-wc/add-transition-between-wh-requisition-wc/add-transition-between-wh-requisition-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddTransitionBetweenWhRequisitionWcComponent
  ],
  imports: [
    SharedModule,
    TransitionBetweenWhRequisitionAddWcModuleRoutingModule
  ]
})
export class TransitionBetweenWhRequisitionAddWcModuleModule { }
