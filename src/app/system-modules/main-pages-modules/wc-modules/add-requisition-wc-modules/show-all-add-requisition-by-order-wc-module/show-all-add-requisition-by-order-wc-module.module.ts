import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllAddRequisitionByOrderWcModuleRoutingModule } from './show-all-add-requisition-by-order-wc-module-routing.module';

// Component
import { ShowAllAddRequisitionByOrderWcComponent } from 'src/app/main/wc/add-requisition-wc/show-all-add-requisition-by-order-wc/show-all-add-requisition-by-order-wc.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllAddRequisitionByOrderWcComponent
  ],
  imports: [
    SharedModule,
    ShowAllAddRequisitionByOrderWcModuleRoutingModule
  ]
})
export class ShowAllAddRequisitionByOrderWcModuleModule { }
