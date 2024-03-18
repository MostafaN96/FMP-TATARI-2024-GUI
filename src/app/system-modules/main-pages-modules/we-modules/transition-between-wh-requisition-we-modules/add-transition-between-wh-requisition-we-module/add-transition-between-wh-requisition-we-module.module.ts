import { NgModule } from '@angular/core';

// Routing Module
import { AddTransitionBetweenWhRequisitionWeModuleRoutingModule } from './add-transition-between-wh-requisition-we-module-routing.module';

// Component
import { AddTransitionBetweenWhRequisitionWeComponent } from 'src/app/main/we/transition-between-wh-requisition-we/add-transition-between-wh-requisition-we/add-transition-between-wh-requisition-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    AddTransitionBetweenWhRequisitionWeComponent
  ],
  imports: [
    SharedModule,
    AddTransitionBetweenWhRequisitionWeModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class AddTransitionBetweenWhRequisitionWeModuleModule { }
