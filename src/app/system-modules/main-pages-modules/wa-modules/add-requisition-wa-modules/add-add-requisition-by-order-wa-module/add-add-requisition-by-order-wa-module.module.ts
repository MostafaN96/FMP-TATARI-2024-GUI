import { NgModule } from '@angular/core';

// Routing Module
import { AddAddRequisitionByOrderWaModuleRoutingModule } from './add-add-requisition-by-order-wa-module-routing.module';

// Component
import { AddAddRequisitionByOrderWaComponent } from 'src/app/main/wa/add-requisition-wa/add-add-requisition-by-order-wa/add-add-requisition-by-order-wa.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddAddRequisitionByOrderWaComponent
  ],
  imports: [
    SharedModule,
    AddAddRequisitionByOrderWaModuleRoutingModule
  ]
})
export class AddAddRequisitionByOrderWaModuleModule { }
