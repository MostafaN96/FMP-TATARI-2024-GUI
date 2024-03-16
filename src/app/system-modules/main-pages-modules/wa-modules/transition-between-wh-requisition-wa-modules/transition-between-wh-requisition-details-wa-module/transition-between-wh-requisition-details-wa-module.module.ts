import { NgModule } from '@angular/core';

// Routing Module
import { TransitionBetweenWhRequisitionDetailsWaModuleRoutingModule } from './transition-between-wh-requisition-details-wa-module-routing.module';

// Component
import { TransitionBetweenWhRequisitionDetailsWaComponent } from 'src/app/main/wa/transition-between-wh-requisition-wa/transition-between-wh-requisition-details-wa/transition-between-wh-requisition-details-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { AddTransitionBetweenWhRequisitionFromWaComponent } from 'src/app/main/wa/transition-between-wh-requisition-wa/add-transition-between-wh-requisition-from-wa/add-transition-between-wh-requisition-from-wa.component';
import { UpdateTransitionBetweenWhRequisitionWaComponent } from 'src/app/main/wa/transition-between-wh-requisition-wa/update-transition-between-wh-requisition-wa/update-transition-between-wh-requisition-wa.component';

@NgModule({
  declarations: [
    TransitionBetweenWhRequisitionDetailsWaComponent,
    UpdateTransitionBetweenWhRequisitionWaComponent,
    AddTransitionBetweenWhRequisitionFromWaComponent
  ],
  imports: [
    SharedModule,
    TransitionBetweenWhRequisitionDetailsWaModuleRoutingModule
  ]
})
export class TransitionBetweenWhRequisitionDetailsWaModuleModule { }
