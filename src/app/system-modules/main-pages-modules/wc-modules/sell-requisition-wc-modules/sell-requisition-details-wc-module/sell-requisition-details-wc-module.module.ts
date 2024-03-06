import { NgModule } from '@angular/core';

// Routing Module
import { SellRequisitionDetailsWcModuleRoutingModule } from './sell-requisition-details-wc-module-routing.module';

// Component
import { SellRequisitionDetailsWcComponent } from 'src/app/main/wc/sell-requisition-wc/sell-requisition-details-wc/sell-requisition-details-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateSellRequisitionWcComponent } from 'src/app/main/wc/sell-requisition-wc/update-sell-requisition-wc/update-sell-requisition-wc.component';
import { AddSellRequisitionFormWcComponent } from 'src/app/main/wc/sell-requisition-wc/add-sell-requisition-form-wc/add-sell-requisition-form-wc.component';

@NgModule({
  declarations: [
    SellRequisitionDetailsWcComponent,
    UpdateSellRequisitionWcComponent,
    AddSellRequisitionFormWcComponent
  ],
  imports: [
    SharedModule,
    SellRequisitionDetailsWcModuleRoutingModule
  ]
})
export class SellRequisitionDetailsWcModuleModule { }
