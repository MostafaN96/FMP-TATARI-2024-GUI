import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllTransitionBetweenWhRequisitionWaModuleRoutingModule } from './show-all-transition-between-wh-requisition-wa-module-routing.module';

// Component
import { ShowAllTransitionBetweenWhRequisitionWaComponent } from 'src/app/main/wa/transition-between-wh-requisition-wa/show-all-transition-between-wh-requisition-wa/show-all-transition-between-wh-requisition-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllTransitionBetweenWhRequisitionWaComponent
  ],
  imports: [
    SharedModule,
    ShowAllTransitionBetweenWhRequisitionWaModuleRoutingModule
  ]
})
export class ShowAllTransitionBetweenWhRequisitionWaModuleModule { }
