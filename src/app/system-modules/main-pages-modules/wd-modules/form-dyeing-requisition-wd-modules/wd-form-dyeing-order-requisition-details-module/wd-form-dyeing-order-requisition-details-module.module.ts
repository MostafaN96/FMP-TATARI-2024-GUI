import { NgModule } from '@angular/core';

// Routing Module
import { WdFormDyeingOrderRequisitionDetailsModuleRoutingModule } from './wd-form-dyeing-order-requisition-details-module-routing.module';

// Component
import { WdFormDyeingOrderRequisitionDetailsComponent } from 'src/app/main/wd/form-dyeing-requisition-wd/wd-form-dyeing-order-requisition-details/wd-form-dyeing-order-requisition-details.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { WdFormDyeingOrderRequisitionUpdateComponent } from 'src/app/main/wd/form-dyeing-requisition-wd/wd-form-dyeing-order-requisition-update/wd-form-dyeing-order-requisition-update.component';
import { AddFormDyeingRequisitionByOrderFormWdComponent } from 'src/app/main/wd/form-dyeing-requisition-wd/add-form-dyeing-requisition-by-order-form-wd/add-form-dyeing-requisition-by-order-form-wd.component';

// Shared Components
import { SharedComponentsModule } from 'src/app/system-modules/main-pages-modules/shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    WdFormDyeingOrderRequisitionDetailsComponent,
    WdFormDyeingOrderRequisitionUpdateComponent,
    AddFormDyeingRequisitionByOrderFormWdComponent,
  ],
  imports: [
    SharedModule,
    WdFormDyeingOrderRequisitionDetailsModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class WdFormDyeingOrderRequisitionDetailsModuleModule { }
