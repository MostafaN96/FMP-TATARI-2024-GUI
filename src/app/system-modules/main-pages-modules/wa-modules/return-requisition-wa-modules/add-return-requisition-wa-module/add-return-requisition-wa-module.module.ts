import { NgModule } from '@angular/core';

// Routing Module
import { AddReturnRequisitionWaModuleRoutingModule } from './add-return-requisition-wa-module-routing.module';

// Component
import { AddReturnRequisitionWaComponent } from '../../../../../main/wa/return-requisition-wa/add-return-requisition-wa/add-return-requisition-wa.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddReturnRequisitionWaComponent
  ],
  imports: [
    SharedModule,
    AddReturnRequisitionWaModuleRoutingModule
  ]
})
export class AddReturnRequisitionWaModuleModule { }
