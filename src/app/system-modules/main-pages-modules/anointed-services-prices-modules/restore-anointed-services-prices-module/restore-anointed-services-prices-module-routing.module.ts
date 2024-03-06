import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreAnointedServicesPricesComponent } from '../../../../main/anointed-services-prices/restore-anointed-services-prices/restore-anointed-services-prices.component';

export const routes: Routes = [

    {

        path: '', component: RestoreAnointedServicesPricesComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreAnointedServicesPricesModuleRoutingModule { }
