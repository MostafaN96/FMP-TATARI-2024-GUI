import { NgModule } from '@angular/core';

import { DyedFabricOrdersDetailsReportWeModuleRoutingModule } from './dyed-fabric-orders-details-report-we-module-routing.module';

// Component
import { DyedFabricOrdersDetailsReportWeComponent } from 'src/app/main/we/reports/dyed-fabric-orders-details-report-we/dyed-fabric-orders-details-report-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    DyedFabricOrdersDetailsReportWeComponent
  ],
  imports: [
    SharedModule,
    DyedFabricOrdersDetailsReportWeModuleRoutingModule
  ]
})
export class DyedFabricOrdersDetailsReportWeModuleModule { }
