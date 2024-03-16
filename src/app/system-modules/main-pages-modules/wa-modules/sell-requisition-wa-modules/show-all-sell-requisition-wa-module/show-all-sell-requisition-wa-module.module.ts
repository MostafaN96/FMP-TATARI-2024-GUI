import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllSellRequisitionWaModuleRoutingModule } from './show-all-sell-requisition-wa-module-routing.module';

// Component
import { ShowAllSellRequisitionComponent } from 'src/app/main/wa/sell-requisition-wa/show-all-sell-requisition/show-all-sell-requisition.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllSellRequisitionComponent
  ],
  imports: [
    SharedModule,
    ShowAllSellRequisitionWaModuleRoutingModule
  ]
})
export class ShowAllSellRequisitionWaModuleModule { }
