import { NgModule } from '@angular/core';

// Routing Module
import { AddTransitionBetweenWhRequisitionWaModuleRoutingModule } from './add-transition-between-wh-requisition-wa-module-routing.module';

// Component
import { AddTransitionBetweenWhRequisitionWaComponent } from 'src/app/main/wa/transition-between-wh-requisition-wa/add-transition-between-wh-requisition-wa/add-transition-between-wh-requisition-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddTransitionBetweenWhRequisitionWaComponent
  ],
  imports: [
    SharedModule,
    AddTransitionBetweenWhRequisitionWaModuleRoutingModule
  ]
})
export class AddTransitionBetweenWhRequisitionWaModuleModule { }
