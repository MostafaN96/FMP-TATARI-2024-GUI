import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHistoryByCircularKnittingMachinesManufacturingReportWbComponent } from 'src/app/main/wb/reports/item-history-by-circular-knitting-machines-manufacturing-report-wb/item-history-by-circular-knitting-machines-manufacturing-report-wb.component';

export const routes: Routes = [

    {

        path: '', component: ItemHistoryByCircularKnittingMachinesManufacturingReportWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHistoryByCircularKnittingMachinesManufacturingReportWbRoutingModule { }
