import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddReturnRequisitionWeModuleRoutingModule } from './add-return-requisition-we-module-routing.module';

// Component
import { AddReturnRequisitionWeComponent } from '../../../../../main/we/return-requisition-we/add-return-requisition-we/add-return-requisition-we.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    AddReturnRequisitionWeComponent
  ],
  imports: [
    SharedModule,
    AddReturnRequisitionWeModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class AddReturnRequisitionWeModuleModule { }
