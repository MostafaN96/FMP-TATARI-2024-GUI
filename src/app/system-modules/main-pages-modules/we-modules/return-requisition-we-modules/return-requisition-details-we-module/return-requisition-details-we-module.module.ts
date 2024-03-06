import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnRequisitionDetailsWeModuleRoutingModule } from './return-requisition-details-we-module-routing.module';

// Component
import { ReturnRequisitionDetailsWeComponent } from 'src/app/main/we/return-requisition-we/return-requisition-details-we/return-requisition-details-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateReturnRequisitionWeComponent } from 'src/app/main/we/return-requisition-we/update-return-requisition-we/update-return-requisition-we.component';
import { AddReturnRequisitionFormWeComponent } from 'src/app/main/we/return-requisition-we/add-return-requisition-form-we/add-return-requisition-form-we.component';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    ReturnRequisitionDetailsWeComponent,
    UpdateReturnRequisitionWeComponent,
    AddReturnRequisitionFormWeComponent
  ],
  imports: [
    SharedModule,
    ReturnRequisitionDetailsWeModuleRoutingModule,
    SharedComponentsModule,
  ],
  exports: [
    SharedComponentsModule,
  ]
})
export class ReturnRequisitionDetailsWeModuleModule { }
