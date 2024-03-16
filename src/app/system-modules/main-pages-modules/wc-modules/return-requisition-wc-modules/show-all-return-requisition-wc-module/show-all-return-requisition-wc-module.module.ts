import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllReturnRequisitionWcModuleRoutingModule } from './show-all-return-requisition-wc-module-routing.module';

// Component
import { ShowAllReturnRequisitionWcComponent } from 'src/app/main/wc/return-requisition-wc/show-all-return-requisition-wc/show-all-return-requisition-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllReturnRequisitionWcComponent
  ],
  imports: [
    SharedModule,
    ShowAllReturnRequisitionWcModuleRoutingModule
  ]
})
export class ShowAllReturnRequisitionWcModuleModule { }
