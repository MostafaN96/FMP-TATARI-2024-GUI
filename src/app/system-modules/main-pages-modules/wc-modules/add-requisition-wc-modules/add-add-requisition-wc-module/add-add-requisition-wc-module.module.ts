import { NgModule } from '@angular/core';

// Routing Module
import { AddAddRequisitionWcModuleRoutingModule } from './add-add-requisition-wc-module-routing.module';

// Component
import { AddAddRequisitionWcComponent } from 'src/app/main/wc/add-requisition-wc/add-add-requisition-wc/add-add-requisition-wc.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddAddRequisitionWcComponent
  ],
  imports: [
    SharedModule,
    AddAddRequisitionWcModuleRoutingModule
  ]
})
export class AddAddRequisitionWcModuleModule { }
