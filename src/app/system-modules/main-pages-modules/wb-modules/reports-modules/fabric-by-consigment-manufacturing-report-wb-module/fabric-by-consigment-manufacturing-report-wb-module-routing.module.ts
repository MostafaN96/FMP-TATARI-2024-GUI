import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { FabricByConsigmentManufacturingReportWbComponent } from 'src/app/main/wb/reports/fabric-by-consigment-manufacturing-report-wb/fabric-by-consigment-manufacturing-report-wb.component';

export const routes: Routes = [

    {

        path: '', component: FabricByConsigmentManufacturingReportWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FabricByConsigmentManufacturingReportWbModuleRoutingModule { }
