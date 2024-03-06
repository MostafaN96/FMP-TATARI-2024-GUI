import { NgModule } from '@angular/core';

import { AddSellRequisitionWeModuleRoutingModule } from './add-sell-requisition-we-module-routing.module';

// Component
import { AddSellRequisitionWeComponent } from 'src/app/main/we/sell-requisition-we/add-sell-requisition-we/add-sell-requisition-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    AddSellRequisitionWeComponent
  ],
  imports: [
    SharedModule,
    AddSellRequisitionWeModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class AddSellRequisitionWeModuleModule { }
