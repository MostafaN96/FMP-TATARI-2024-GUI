import { NgModule } from '@angular/core';

import { ConfirmDirectSellWeModuleRoutingModule } from './confirm-direct-sell-we-module-routing.module';

// Component
import { ConfirmDirectSellWeComponent } from '../../../../../main/we/sell-requisition-we/confirm-direct-sell-we/confirm-direct-sell-we.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

// Shared Components
import { SharedComponentsModule } from '../../../shared-component-module/shared-components.module';

@NgModule({
  declarations: [
    ConfirmDirectSellWeComponent
  ],
  imports: [
    SharedModule,
    ConfirmDirectSellWeModuleRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class ConfirmDirectSellWeModuleModule { }
