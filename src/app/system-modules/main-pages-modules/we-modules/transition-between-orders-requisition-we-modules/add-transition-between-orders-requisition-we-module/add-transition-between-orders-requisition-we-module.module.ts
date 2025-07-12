import { NgModule } from '@angular/core';

// Routing Module
import { AddTransitionBetweenOrdersRequisitionWeModuleRoutingModule } from './add-transition-between-orders-requisition-we-module-routing.module';

// Component
import { AddTransitionBetweenOrdersRequisitionWeComponent } from 'src/app/main/we/transition-between-orders-requisition-we/add-transition-between-orders-requisition-we/add-transition-between-orders-requisition-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    AddTransitionBetweenOrdersRequisitionWeComponent
  ],
  imports: [
    SharedModule,
    AddTransitionBetweenOrdersRequisitionWeModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class AddTransitionBetweenOrdersRequisitionWeModuleModule { }
