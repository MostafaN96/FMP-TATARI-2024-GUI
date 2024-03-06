import { NgModule } from '@angular/core';

// Routing Module
import { SellRequisitionDetailsWaModuleRoutingModule } from './sell-requisition-details-wa-module-routing.module';

// Component
import { SellRequisitionDetailsComponent } from 'src/app/main/wa/sell-requisition-wa/sell-requisition-details/sell-requisition-details.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateSellRequisitionWaComponent } from 'src/app/main/wa/sell-requisition-wa/update-sell-requisition-wa/update-sell-requisition-wa.component';
import { AddSellRequisitionFormWaComponent } from 'src/app/main/wa/sell-requisition-wa/add-sell-requisition-form-wa/add-sell-requisition-form-wa.component';

@NgModule({
  declarations: [
    SellRequisitionDetailsComponent,
    UpdateSellRequisitionWaComponent,
    AddSellRequisitionFormWaComponent
  ],
  imports: [
    SharedModule,
    SellRequisitionDetailsWaModuleRoutingModule
  ]
})
export class SellRequisitionDetailsWaModuleModule { }
