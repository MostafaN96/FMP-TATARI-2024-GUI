import { NgModule } from '@angular/core';

// Routing Module
import { FabricOrdersReportWdModuleRoutingModule } from './fabric-orders-report-wd-module-routing.module';

// Component
import { FabricOrdersReportWdComponent } from 'src/app/main/wd/reports/fabric-orders-report-wd/fabric-orders-report-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    FabricOrdersReportWdComponent
  ],
  imports: [
    SharedModule,
    FabricOrdersReportWdModuleRoutingModule
  ]
})
export class FabricOrdersReportWdModuleModule { }
