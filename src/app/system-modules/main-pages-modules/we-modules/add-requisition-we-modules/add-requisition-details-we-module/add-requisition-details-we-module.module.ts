import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRequisitionDetailsWeModuleRoutingModule } from './add-requisition-details-we-module-routing.module';

// Component
import { AddRequisitionDetailsWeComponent } from 'src/app/main/we/add-requisition-we/add-requisition-details-we/add-requisition-details-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateAddRequisitionWeComponent } from 'src/app/main/we/add-requisition-we/update-add-requisition-we/update-add-requisition-we.component';
import { WeAddRequisitionFormAddDetailsComponent } from 'src/app/main/we/add-requisition-we/we-add-requisition-form-add-details/we-add-requisition-form-add-details.component';

@NgModule({
  declarations: [
    AddRequisitionDetailsWeComponent,
    UpdateAddRequisitionWeComponent,
    WeAddRequisitionFormAddDetailsComponent
  ],
  imports: [
    SharedModule,
    AddRequisitionDetailsWeModuleRoutingModule
  ]
})
export class AddRequisitionDetailsWeModuleModule { }
