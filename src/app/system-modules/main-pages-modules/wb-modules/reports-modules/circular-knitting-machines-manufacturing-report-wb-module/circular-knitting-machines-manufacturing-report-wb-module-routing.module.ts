import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { CircularKnittingMachinesManufacturingReportWbComponent } from 'src/app/main/wb/reports/circular-knitting-machines-manufacturing-report-wb/circular-knitting-machines-manufacturing-report-wb.component';

export const routes: Routes = [

    {

        path: '', component: CircularKnittingMachinesManufacturingReportWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CircularKnittingMachinesManufacturingReportWbModuleRoutingModule { }
