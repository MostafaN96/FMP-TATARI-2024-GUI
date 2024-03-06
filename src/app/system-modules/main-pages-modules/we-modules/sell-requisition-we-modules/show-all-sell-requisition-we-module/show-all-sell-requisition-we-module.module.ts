import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllSellRequisitionWeModuleRoutingModule } from './show-all-sell-requisition-we-module-routing.module';

// Component
import { ShowAllSellRequisitionWeComponent } from '../../../../../main/we/sell-requisition-we/show-all-sell-requisition-we/show-all-sell-requisition-we.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllSellRequisitionWeComponent
  ],
  imports: [
    SharedModule,
    ShowAllSellRequisitionWeModuleRoutingModule
  ]
})
export class ShowAllSellRequisitionWeModuleModule { }
