import { NgModule } from '@angular/core';

import { FabricOrdersReportWcModuleRoutingModule } from './fabric-orders-report-wc-module-routing.module';

// Component
import { FabricOrdersReportWcComponent } from 'src/app/main/wc/reports/fabric-orders-report-wc/fabric-orders-report-wc.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    FabricOrdersReportWcComponent
  ],
  imports: [
    SharedModule,
    FabricOrdersReportWcModuleRoutingModule
  ]
})
export class FabricOrdersReportWcModuleModule { }
