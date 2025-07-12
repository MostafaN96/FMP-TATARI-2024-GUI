import { NgModule } from '@angular/core';

// Routing Module
import { AddAddRequisitionByOrderWcModuleRoutingModule } from './add-add-requisition-by-order-wc-module-routing.module';

// Component
import { AddAddRequisitionByOrderWcComponent } from 'src/app/main/wc/add-requisition-wc/add-add-requisition-by-order-wc/add-add-requisition-by-order-wc.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddAddRequisitionByOrderWcComponent
  ],
  imports: [
    SharedModule,
    AddAddRequisitionByOrderWcModuleRoutingModule
  ]
})
export class AddAddRequisitionByOrderWcModuleModule { }
