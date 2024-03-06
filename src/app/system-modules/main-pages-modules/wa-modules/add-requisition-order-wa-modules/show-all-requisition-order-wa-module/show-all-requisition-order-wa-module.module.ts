import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllRequisitionOrderWaModuleRoutingModule } from './show-all-requisition-order-wa-module-routing.module';

// Component
import { ShowAllAddRequisitionOrderWaComponent } from 'src/app/main/wa/add-requisition-order-wa/show-all-add-requisition-order-wa/show-all-add-requisition-order-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';


@NgModule({
  declarations: [
    ShowAllAddRequisitionOrderWaComponent
  ],
  imports: [
    SharedModule,
    ShowAllRequisitionOrderWaModuleRoutingModule
  ]
})
export class ShowAllRequisitionOrderWaModuleModule { }
