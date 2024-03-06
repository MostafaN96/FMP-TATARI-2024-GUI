import { NgModule } from '@angular/core';

// Routing Module
import { CircularKnittingMachinesManufacturingReportWbModuleRoutingModule } from './circular-knitting-machines-manufacturing-report-wb-module-routing.module';

// Component
import { CircularKnittingMachinesManufacturingReportWbComponent } from 'src/app/main/wb/reports/circular-knitting-machines-manufacturing-report-wb/circular-knitting-machines-manufacturing-report-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    CircularKnittingMachinesManufacturingReportWbComponent
  ],
  imports: [
    SharedModule,
    CircularKnittingMachinesManufacturingReportWbModuleRoutingModule
  ]
})
export class CircularKnittingMachinesManufacturingReportWbModuleModule { }
