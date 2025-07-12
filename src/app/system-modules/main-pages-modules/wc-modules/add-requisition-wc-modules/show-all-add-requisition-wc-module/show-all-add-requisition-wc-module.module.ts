import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllAddRequisitionWcModuleRoutingModule } from './show-all-add-requisition-wc-module-routing.module';

// Component
import { ShowAllAddRequisitionWcComponent } from 'src/app/main/wc/add-requisition-wc/show-all-add-requisition-wc/show-all-add-requisition-wc.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllAddRequisitionWcComponent
  ],
  imports: [
    SharedModule,
    ShowAllAddRequisitionWcModuleRoutingModule
  ]
})
export class ShowAllAddRequisitionWcModuleModule { }
