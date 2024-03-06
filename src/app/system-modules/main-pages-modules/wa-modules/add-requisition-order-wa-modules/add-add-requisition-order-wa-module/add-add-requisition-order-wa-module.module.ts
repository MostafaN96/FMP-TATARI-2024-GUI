import { NgModule } from '@angular/core';

// Routing Module
import { AddAddRequisitionOrderWaModuleRoutingModule } from './add-add-requisition-order-wa-module-routing.module';

// Component
import { AddAddRequisitionOrderWaComponent } from 'src/app/main/wa/add-requisition-order-wa/add-add-requisition-order-wa/add-add-requisition-order-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddAddRequisitionOrderWaComponent
  ],
  imports: [
    SharedModule,
    AddAddRequisitionOrderWaModuleRoutingModule
  ]
})
export class AddAddRequisitionOrderWaModuleModule { }
