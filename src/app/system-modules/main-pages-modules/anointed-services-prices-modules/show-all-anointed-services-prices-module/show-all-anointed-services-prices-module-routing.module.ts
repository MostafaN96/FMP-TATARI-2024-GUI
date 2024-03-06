import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllAnointedServicesPricesComponent } from '../../../../main/anointed-services-prices/show-all-anointed-services-prices/show-all-anointed-services-prices.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllAnointedServicesPricesComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllAnointedServicesPricesModuleRoutingModule { }
