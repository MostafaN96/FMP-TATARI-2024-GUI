import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAddRequisitionWeModuleRoutingModule } from './add-add-requisition-we-module-routing.module';

// Component
import { AddAddRequisitionWeComponent } from '../../../../../main/we/add-requisition-we/add-add-requisition-we/add-add-requisition-we.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddAddRequisitionWeComponent,
  ],
  imports: [
    SharedModule,
    AddAddRequisitionWeModuleRoutingModule,
    
  ]
})
export class AddAddRequisitionWeModuleModule { }
