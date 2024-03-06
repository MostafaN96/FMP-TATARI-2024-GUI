import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddAnointedServicesPricesComponent } from '../../../../main/anointed-services-prices/add-anointed-services-prices/add-anointed-services-prices.component';

export const routes: Routes = [

    {

        path: '', component: AddAnointedServicesPricesComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddAnointedServicesPricesModuleRoutingModule { }
