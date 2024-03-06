import { NgModule } from '@angular/core';

// Routing Module
import { FabricByConsigmentManufacturingReportWbModuleRoutingModule } from './fabric-by-consigment-manufacturing-report-wb-module-routing.module';

// Component
import { FabricByConsigmentManufacturingReportWbComponent } from 'src/app/main/wb/reports/fabric-by-consigment-manufacturing-report-wb/fabric-by-consigment-manufacturing-report-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    FabricByConsigmentManufacturingReportWbComponent
  ],
  imports: [
    SharedModule,
    FabricByConsigmentManufacturingReportWbModuleRoutingModule
  ]
})
export class FabricByConsigmentManufacturingReportWbModuleModule { }
