import { NgModule } from '@angular/core';

// Routing Module
import { FormDyeingRequisitionDetailsWdModuleRoutingModule } from './form-dyeing-requisition-details-wd-module-routing.module';

// Component
import { FormDyeingRequisitionDetailsWdComponent } from 'src/app/main/wd/form-dyeing-requisition-wd/form-dyeing-requisition-details-wd/form-dyeing-requisition-details-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateFormDyeingRequisitionWdComponent } from 'src/app/main/wd/form-dyeing-requisition-wd/update-form-dyeing-requisition-wd/update-form-dyeing-requisition-wd.component';
import { AddFormDyeingRequisitionFormWdComponent } from 'src/app/main/wd/form-dyeing-requisition-wd/add-form-dyeing-requisition-form-wd/add-form-dyeing-requisition-form-wd.component';

// Shared Components
import { SharedComponentsModule } from 'src/app/system-modules/main-pages-modules/shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    FormDyeingRequisitionDetailsWdComponent,
    UpdateFormDyeingRequisitionWdComponent,
    AddFormDyeingRequisitionFormWdComponent,
  ],
  imports: [
    SharedModule,
    FormDyeingRequisitionDetailsWdModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class FormDyeingRequisitionDetailsWdModuleModule { }
