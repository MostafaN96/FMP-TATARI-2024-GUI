import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryByCircularKnittingMachinesManufacturingReportWbRoutingModule } from './item-history-by-circular-knitting-machines-manufacturing-report-wb-routing.module';

// Component
import { ItemHistoryByCircularKnittingMachinesManufacturingReportWbComponent } from 'src/app/main/wb/reports/item-history-by-circular-knitting-machines-manufacturing-report-wb/item-history-by-circular-knitting-machines-manufacturing-report-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ItemHistoryByCircularKnittingMachinesManufacturingReportWbComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryByCircularKnittingMachinesManufacturingReportWbRoutingModule
  ]
})
export class ItemHistoryByCircularKnittingMachinesManufacturingReportWbModule { }
