import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { SellerFabricOrdersReportWbComponent } from 'src/app/main/wb/reports/seller-fabric-orders-report-wb/seller-fabric-orders-report-wb.component';

export const routes: Routes = [

    {

        path: '', component: SellerFabricOrdersReportWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SellerFabricOrdersReportWbModuleRoutingModule { }
