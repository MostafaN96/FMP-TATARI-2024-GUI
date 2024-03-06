import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllAddRequisitionWeModuleRoutingModule } from './show-all-add-requisition-we-module-routing.module';

// Component
import { ShowAllAddRequisitionWeComponent } from '../../../../../main/we/add-requisition-we/show-all-add-requisition-we/show-all-add-requisition-we.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllAddRequisitionWeComponent,
  ],
  imports: [
    SharedModule,
    ShowAllAddRequisitionWeModuleRoutingModule
  ]
})
export class ShowAllAddRequisitionWeModuleModule { }
