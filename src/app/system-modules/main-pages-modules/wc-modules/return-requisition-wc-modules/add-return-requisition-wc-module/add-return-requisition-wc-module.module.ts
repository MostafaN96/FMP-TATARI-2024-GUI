import { NgModule } from '@angular/core';

// Routing Module
import { AddReturnRequisitionWcModuleRoutingModule } from './add-return-requisition-wc-module-routing.module';

// Component
import { AddReturnRequisitionWcComponent } from '../../../../../main/wc/return-requisition-wc/add-return-requisition-wc/add-return-requisition-wc.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddReturnRequisitionWcComponent
  ],
  imports: [
    SharedModule,
    AddReturnRequisitionWcModuleRoutingModule
  ]
})
export class AddReturnRequisitionWcModuleModule { }
