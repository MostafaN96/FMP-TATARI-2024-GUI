import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllTransitionBetweenWhRequisitionWeModuleRoutingModule } from './show-all-transition-between-wh-requisition-we-module-routing.module';

// Component
import { ShowAllTransitionBetweenWhRequisitionWeComponent } from 'src/app/main/we/transition-between-wh-requisition-we/show-all-transition-between-wh-requisition-we/show-all-transition-between-wh-requisition-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllTransitionBetweenWhRequisitionWeComponent
  ],
  imports: [
    SharedModule,
    ShowAllTransitionBetweenWhRequisitionWeModuleRoutingModule
  ]
})
export class ShowAllTransitionBetweenWhRequisitionWeModuleModule { }
