import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellRequisitionDetalisWeModuleRoutingModule } from './sell-requisition-detalis-we-module-routing.module';

// Component
import { SellRequisitionDetalisWeComponent } from 'src/app/main/we/sell-requisition-we/sell-requisition-detalis-we/sell-requisition-detalis-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateSellRequisitionWeComponent } from 'src/app/main/we/sell-requisition-we/update-sell-requisition-we/update-sell-requisition-we.component';
import { AddSellRequisitionFormWeComponent } from 'src/app/main/we/sell-requisition-we/add-sell-requisition-form-we/add-sell-requisition-form-we.component';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    SellRequisitionDetalisWeComponent,
    UpdateSellRequisitionWeComponent,
    AddSellRequisitionFormWeComponent,
  ],
  imports: [
    SharedModule,
    SellRequisitionDetalisWeModuleRoutingModule,
    SharedComponentsModule,
  ],
  exports: [
    SharedComponentsModule,
  ]
})
export class SellRequisitionDetalisWeModuleModule { }
