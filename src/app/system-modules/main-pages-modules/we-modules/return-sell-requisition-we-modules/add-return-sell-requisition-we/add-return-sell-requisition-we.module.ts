import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddReturnSellRequisitionWeRoutingModule } from './add-return-sell-requisition-we-routing.module';

// Component
import { AddReturnSellRequisitionWeComponent } from '../../../../../main/we/return-sell-requisition-we/add-return-sell-requisition-we/add-return-sell-requisition-we.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    AddReturnSellRequisitionWeComponent
  ],
  imports: [
    SharedModule,
    AddReturnSellRequisitionWeRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class AddReturnSellRequisitionWeModule { }
