import { NgModule } from '@angular/core';

// Routing Module
import { FabricOrdersReportWbModuleRoutingModule } from './fabric-orders-report-wb-module-routing.module';

// Component
import { FabricOrdersReportWbComponent } from 'src/app/main/wb/reports/fabric-orders-report-wb/fabric-orders-report-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    FabricOrdersReportWbComponent
  ],
  imports: [
    SharedModule,
    FabricOrdersReportWbModuleRoutingModule
  ]
})
export class FabricOrdersReportWbModuleModule { }
