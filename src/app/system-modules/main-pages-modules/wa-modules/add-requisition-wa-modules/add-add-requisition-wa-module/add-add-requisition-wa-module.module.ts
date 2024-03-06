import { NgModule } from '@angular/core';

// Routing Module
import { AddAddRequisitionWaModuleRoutingModule } from './add-add-requisition-wa-module-routing.module';

// Component
import { AddAddRequisitionWaComponent } from 'src/app/main/wa/add-requisition-wa/add-add-requisition-wa/add-add-requisition-wa.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddAddRequisitionWaComponent
  ],
  imports: [
    SharedModule,
    AddAddRequisitionWaModuleRoutingModule
  ]
})
export class AddAddRequisitionWaModuleModule { }
