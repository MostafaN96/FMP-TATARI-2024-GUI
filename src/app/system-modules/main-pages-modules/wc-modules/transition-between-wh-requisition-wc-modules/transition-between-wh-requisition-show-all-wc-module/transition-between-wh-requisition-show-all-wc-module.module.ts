import { NgModule } from '@angular/core';

// Routing Module
import { TransitionBetweenWhRequisitionShowAllWcModuleRoutingModule } from './transition-between-wh-requisition-show-all-wc-module-routing.module';

// Component
import { TransitionBetweenWhRequisitionShowAllWcComponent } from 'src/app/main/wc/transition-between-wh-requisition-wc/transition-between-wh-requisition-show-all-wc/transition-between-wh-requisition-show-all-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    TransitionBetweenWhRequisitionShowAllWcComponent
  ],
  imports: [
    SharedModule,
    TransitionBetweenWhRequisitionShowAllWcModuleRoutingModule
  ]
})
export class TransitionBetweenWhRequisitionShowAllWcModuleModule { }
