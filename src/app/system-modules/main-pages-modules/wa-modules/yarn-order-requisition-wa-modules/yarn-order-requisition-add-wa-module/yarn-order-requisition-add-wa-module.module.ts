import { NgModule } from '@angular/core';

// Routing Module
import { YarnOrderRequisitionAddWaModuleRoutingModule } from './yarn-order-requisition-add-wa-module-routing.module';

// Component
import { YarnOrderRequisitionAddWaComponent } from 'src/app/main/wa/yarn-order-requisition-wa/yarn-order-requisition-add-wa/yarn-order-requisition-add-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    YarnOrderRequisitionAddWaComponent
  ],
  imports: [
    SharedModule,
    YarnOrderRequisitionAddWaModuleRoutingModule,
  ]
})
export class YarnOrderRequisitionAddWaModuleModule { }
