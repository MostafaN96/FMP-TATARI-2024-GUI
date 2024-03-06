import { NgModule } from '@angular/core';

// Routing Module
import { WbManufacturingRequisitionInputDetailsOrderModuleRoutingModule } from './wb-manufacturing-requisition-input-details-order-module-routing.module';

// Component
import { WbManufacturingRequisitionInputDetailsOrderComponent } from 'src/app/main/wb/manufacturing-requisition-wb/wb-manufacturing-requisition-input-details-order/wb-manufacturing-requisition-input-details-order.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { WbManufacturingRequisitionOutputDetailsOrderComponent } from 'src/app/main/wb/manufacturing-requisition-wb/wb-manufacturing-requisition-output-details-order/wb-manufacturing-requisition-output-details-order.component';
import { UpdateManufacturingOutputOrderComponent } from 'src/app/main/wb/manufacturing-requisition-wb/update-manufacturing-output-order/update-manufacturing-output-order.component';

// Shared Components
import { SharedComponentsModule } from 'src/app/shared-components/shared-wb-components.module';

@NgModule({
  declarations: [
    WbManufacturingRequisitionInputDetailsOrderComponent,
    WbManufacturingRequisitionOutputDetailsOrderComponent,
    UpdateManufacturingOutputOrderComponent,
  ],
  imports: [
    SharedModule,
    WbManufacturingRequisitionInputDetailsOrderModuleRoutingModule,

    // Shared Components
    SharedComponentsModule
  ],
  exports: [
    // Shared Components
    SharedComponentsModule
  ]
})
export class WbManufacturingRequisitionInputDetailsOrderModuleModule { }
