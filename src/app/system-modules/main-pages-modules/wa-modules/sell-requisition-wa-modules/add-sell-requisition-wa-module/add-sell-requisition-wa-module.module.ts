import { NgModule } from '@angular/core';

// Routing Module
import { AddSellRequisitionWaModuleRoutingModule } from './add-sell-requisition-wa-module-routing.module';

// Component
import { AddSellRequisitionWaComponent } from '../../../../../main/wa/sell-requisition-wa/add-sell-requisition-wa/add-sell-requisition-wa.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddSellRequisitionWaComponent
  ],
  imports: [
    SharedModule,
    AddSellRequisitionWaModuleRoutingModule
  ]
})
export class AddSellRequisitionWaModuleModule { }
