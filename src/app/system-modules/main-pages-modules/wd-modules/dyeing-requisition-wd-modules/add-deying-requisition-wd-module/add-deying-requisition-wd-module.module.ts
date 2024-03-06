import { NgModule } from '@angular/core';

// Routing Module
import { AddDeyingRequisitionWdModuleRoutingModule } from './add-deying-requisition-wd-module-routing.module';

// Component
import { AddDyeingRequisitionWdComponent } from '../../../../../main/wd/dyeing-requisition-wd/add-dyeing-requisition-wd/add-dyeing-requisition-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    AddDyeingRequisitionWdComponent
  ],
  imports: [
    SharedModule,
    AddDeyingRequisitionWdModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class AddDeyingRequisitionWdModuleModule { }
