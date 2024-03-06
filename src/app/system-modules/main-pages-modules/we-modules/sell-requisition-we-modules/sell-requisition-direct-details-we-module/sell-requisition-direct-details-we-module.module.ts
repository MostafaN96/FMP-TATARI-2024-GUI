import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellRequisitionDirectDetailsWeModuleRoutingModule } from './sell-requisition-direct-details-we-module-routing.module';

// Component
import { SellRequisitionDirectDetailsWeComponent } from 'src/app/main/we/sell-requisition-we/sell-requisition-direct-details-we/sell-requisition-direct-details-we.component';

// Import Child Component
import { AddSellRequisitionDirectFormWeComponent } from 'src/app/main/we/sell-requisition-we/add-sell-requisition-direct-form-we/add-sell-requisition-direct-form-we.component';
import { UpdateSellRequisitionDirectWeComponent } from 'src/app/main/we/sell-requisition-we/update-sell-requisition-direct-we/update-sell-requisition-direct-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    SellRequisitionDirectDetailsWeComponent,
    AddSellRequisitionDirectFormWeComponent,
    UpdateSellRequisitionDirectWeComponent
  ],
  imports: [
    SharedModule,
    SellRequisitionDirectDetailsWeModuleRoutingModule,
    SharedComponentsModule,
  ],
  exports: [
    SharedComponentsModule,
  ]
})
export class SellRequisitionDirectDetailsWeModuleModule { }
