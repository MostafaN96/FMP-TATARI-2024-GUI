import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllReturnSellRequisitionWeRoutingModule } from './show-all-return-sell-requisition-we-routing.module';

// Component
import { ShowAllReturnSellRequisitionWeComponent } from '../../../../../main/we/return-sell-requisition-we/show-all-return-sell-requisition-we/show-all-return-sell-requisition-we.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllReturnSellRequisitionWeComponent
  ],
  imports: [
    SharedModule,
    ShowAllReturnSellRequisitionWeRoutingModule
  ]
})
export class ShowAllReturnSellRequisitionWeModule { }
