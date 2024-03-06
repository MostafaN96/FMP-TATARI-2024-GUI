import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSellRequisitionDirectWeModuleRoutingModule } from './add-sell-requisition-direct-we-module-routing.module';

// Component
import { AddSellRequisitionDirectWeComponent } from 'src/app/main/we/sell-requisition-we/add-sell-requisition-direct-we/add-sell-requisition-direct-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    AddSellRequisitionDirectWeComponent
  ],
  imports: [
    SharedModule,
    AddSellRequisitionDirectWeModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class AddSellRequisitionDirectWeModuleModule { }
