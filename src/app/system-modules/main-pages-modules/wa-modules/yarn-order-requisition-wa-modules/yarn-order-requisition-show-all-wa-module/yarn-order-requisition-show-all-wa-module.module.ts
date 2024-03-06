import { NgModule } from '@angular/core';

// Routing Module
import { YarnOrderRequisitionShowAllWaModuleRoutingModule } from './yarn-order-requisition-show-all-wa-module-routing.module';

// Component
import { YarnOrderRequisitionShowAllWaComponent } from 'src/app/main/wa/yarn-order-requisition-wa/yarn-order-requisition-show-all-wa/yarn-order-requisition-show-all-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    YarnOrderRequisitionShowAllWaComponent
  ],
  imports: [
    SharedModule,
    YarnOrderRequisitionShowAllWaModuleRoutingModule,
  ]
})
export class YarnOrderRequisitionShowAllWaModuleModule { }
