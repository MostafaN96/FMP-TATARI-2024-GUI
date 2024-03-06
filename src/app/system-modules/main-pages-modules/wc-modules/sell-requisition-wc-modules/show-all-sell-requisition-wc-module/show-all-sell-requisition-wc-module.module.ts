import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllSellRequisitionWcModuleRoutingModule } from './show-all-sell-requisition-wc-module-routing.module';

// Component
import { ShowAllSellRequisitionWcComponent } from '../../../../../main/wc/sell-requisition-wc/show-all-sell-requisition-wc/show-all-sell-requisition-wc.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllSellRequisitionWcComponent
  ],
  imports: [
    SharedModule,
    ShowAllSellRequisitionWcModuleRoutingModule
  ]
})
export class ShowAllSellRequisitionWcModuleModule { }
