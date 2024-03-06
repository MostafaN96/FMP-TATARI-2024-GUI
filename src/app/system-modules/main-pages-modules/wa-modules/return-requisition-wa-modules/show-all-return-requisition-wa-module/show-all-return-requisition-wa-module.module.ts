import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllReturnRequisitionWaModuleRoutingModule } from './show-all-return-requisition-wa-module-routing.module';

// Component
import { ShowAllReturnRequisitionWaComponent } from '../../../../../main/wa/return-requisition-wa/show-all-return-requisition-wa/show-all-return-requisition-wa.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllReturnRequisitionWaComponent
  ],
  imports: [
    SharedModule,
    ShowAllReturnRequisitionWaModuleRoutingModule
  ]
})
export class ShowAllReturnRequisitionWaModuleModule { }
