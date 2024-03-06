import { NgModule } from '@angular/core';

// Routing Module
import { AddRequisitionDetailsModuleRoutingModule } from './add-requisition-details-wa-module-routing.module';

// Component
import { AddRequisitionDetailsWaComponent } from 'src/app/main/wa/add-requisition-wa/add-requisition-details-wa/add-requisition-details-wa.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateAddRequisitionWaComponent } from 'src/app/main/wa/add-requisition-wa/update-add-requisition-wa/update-add-requisition-wa.component';
import { AddDetailsWaComponent } from 'src/app/main/wa/add-requisition-wa/add-details-wa/add-details-wa.component';

@NgModule({
  declarations: [
    AddRequisitionDetailsWaComponent,
    UpdateAddRequisitionWaComponent,
    AddDetailsWaComponent
  ],
  imports: [
    SharedModule,
    AddRequisitionDetailsModuleRoutingModule
  ]
})
export class AddRequisitionDetailsModuleModule { }
