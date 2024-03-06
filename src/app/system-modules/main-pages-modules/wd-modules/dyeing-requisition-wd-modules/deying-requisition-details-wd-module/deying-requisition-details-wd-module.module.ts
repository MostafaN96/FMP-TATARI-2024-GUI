import { NgModule } from '@angular/core';

// Routing Module
import { DeyingRequisitionDetailsWdModuleRoutingModule } from './deying-requisition-details-wd-module-routing.module';

// Component
import { DyeingRequisitionDetailsWdComponent } from '../../../../../main/wd/dyeing-requisition-wd/dyeing-requisition-details-wd/dyeing-requisition-details-wd.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateDyeingRequisitionWdComponent } from '../../../../../main/wd/dyeing-requisition-wd/update-dyeing-requisition-wd/update-dyeing-requisition-wd.component';
import { AddDyeingRequisitionFormWdComponent } from 'src/app/main/wd/dyeing-requisition-wd/add-dyeing-requisition-form-wd/add-dyeing-requisition-form-wd.component';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    DyeingRequisitionDetailsWdComponent,
    UpdateDyeingRequisitionWdComponent,
    AddDyeingRequisitionFormWdComponent,
  ],
  imports: [
    SharedModule,
    DeyingRequisitionDetailsWdModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class DeyingRequisitionDetailsWdModuleModule { }
