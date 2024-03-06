import { NgModule } from '@angular/core';

// Routing Module
import { AddSellRequisitionWcModuleRoutingModule } from './add-sell-requisition-wc-module-routing.module';

// Component
import { AddSellRequisitionWcComponent } from '../../../../../main/wc/sell-requisition-wc/add-sell-requisition-wc/add-sell-requisition-wc.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddSellRequisitionWcComponent
  ],
  imports: [
    SharedModule,
    AddSellRequisitionWcModuleRoutingModule
  ]
})
export class AddSellRequisitionWcModuleModule { }
