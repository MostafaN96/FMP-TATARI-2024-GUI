import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllReturnRequisitionWeModuleRoutingModule } from './show-all-return-requisition-we-module-routing.module';

// Component
import { ShowAllReturnRequisitionWeComponent } from '../../../../../main/we/return-requisition-we/show-all-return-requisition-we/show-all-return-requisition-we.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllReturnRequisitionWeComponent
  ],
  imports: [
    SharedModule,
    ShowAllReturnRequisitionWeModuleRoutingModule
  ]
})
export class ShowAllReturnRequisitionWeModuleModule { }
