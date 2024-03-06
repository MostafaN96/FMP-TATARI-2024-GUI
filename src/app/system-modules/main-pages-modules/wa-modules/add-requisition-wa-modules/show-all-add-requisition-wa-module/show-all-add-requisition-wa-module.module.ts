import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllAddRequisitionModuleRoutingModule } from './show-all-add-requisition-wa-module-routing.module';

// Component
import { ShowAllAddRequisitionWaComponent } from '../../../../../main/wa/add-requisition-wa/show-all-add-requisition-wa/show-all-add-requisition-wa.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';


@NgModule({
  declarations: [
    ShowAllAddRequisitionWaComponent
  ],
  imports: [
    SharedModule,
    ShowAllAddRequisitionModuleRoutingModule
  ]
})
export class ShowAllAddRequisitionModuleModule { }
