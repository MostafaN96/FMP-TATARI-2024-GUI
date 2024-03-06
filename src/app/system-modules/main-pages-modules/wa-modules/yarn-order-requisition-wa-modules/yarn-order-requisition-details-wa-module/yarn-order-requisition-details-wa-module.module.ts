import { NgModule } from '@angular/core';

// Routing Module
import { YarnOrderRequisitionDetailsWaModuleRoutingModule } from './yarn-order-requisition-details-wa-module-routing.module';

// Component
import { YarnOrderRequisitionDetailsWaComponent } from 'src/app/main/wa/yarn-order-requisition-wa/yarn-order-requisition-details-wa/yarn-order-requisition-details-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { YarnOrderRequisitionAddDetailsFormWaComponent } from 'src/app/main/wa/yarn-order-requisition-wa/yarn-order-requisition-add-details-form-wa/yarn-order-requisition-add-details-form-wa.component';
import { YarnOrderRequisitionUpdateWaComponent } from 'src/app/main/wa/yarn-order-requisition-wa/yarn-order-requisition-update-wa/yarn-order-requisition-update-wa.component';

@NgModule({
  declarations: [
    YarnOrderRequisitionDetailsWaComponent,
    YarnOrderRequisitionUpdateWaComponent,
    YarnOrderRequisitionAddDetailsFormWaComponent
  ],
  imports: [
    SharedModule,
    YarnOrderRequisitionDetailsWaModuleRoutingModule,
  ]
})
export class YarnOrderRequisitionDetailsWaModuleModule { }
