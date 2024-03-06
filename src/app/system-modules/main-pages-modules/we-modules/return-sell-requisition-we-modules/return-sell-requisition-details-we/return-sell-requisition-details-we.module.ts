import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnSellRequisitionDetailsWeRoutingModule } from './return-sell-requisition-details-we-routing.module';

// Component
import { ReturnSellRequisitionDetailsWeComponent } from 'src/app/main/we/return-sell-requisition-we/return-sell-requisition-details-we/return-sell-requisition-details-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateReturnSellRequisitionWeComponent } from 'src/app/main/we/return-sell-requisition-we/update-return-sell-requisition-we/update-return-sell-requisition-we.component';
import { AddReturnSellRequisitionFormWeComponent } from 'src/app/main/we/return-sell-requisition-we/add-return-sell-requisition-form-we/add-return-sell-requisition-form-we.component';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    ReturnSellRequisitionDetailsWeComponent,
    UpdateReturnSellRequisitionWeComponent,
    AddReturnSellRequisitionFormWeComponent
  ],
  imports: [
    SharedModule,
    ReturnSellRequisitionDetailsWeRoutingModule,
    SharedComponentsModule,
  ],
  exports: [
    SharedComponentsModule,
  ]
})
export class ReturnSellRequisitionDetailsWeModule { }
