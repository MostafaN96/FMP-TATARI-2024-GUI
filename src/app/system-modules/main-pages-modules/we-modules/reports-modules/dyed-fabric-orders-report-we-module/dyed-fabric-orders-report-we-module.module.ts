import { NgModule } from '@angular/core';

import { DyedFabricOrdersReportWeModuleRoutingModule } from './dyed-fabric-orders-report-we-module-routing.module';

// Component
import { DyedFabricOrdersReportWeComponent } from 'src/app/main/we/reports/dyed-fabric-orders-report-we/dyed-fabric-orders-report-we.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    DyedFabricOrdersReportWeComponent
  ],
  imports: [
    SharedModule,
    DyedFabricOrdersReportWeModuleRoutingModule
  ]
})
export class DyedFabricOrdersReportWeModuleModule { }
