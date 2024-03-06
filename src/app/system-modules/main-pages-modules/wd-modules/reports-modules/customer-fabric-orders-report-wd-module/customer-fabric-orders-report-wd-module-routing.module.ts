import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { CustomerFabricOrdersReportWdComponent } from 'src/app/main/wd/reports/customer-fabric-orders-report-wd/customer-fabric-orders-report-wd.component';

export const routes: Routes = [

    {

        path: '', component: CustomerFabricOrdersReportWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CustomerFabricOrdersReportWdModuleRoutingModule { }
