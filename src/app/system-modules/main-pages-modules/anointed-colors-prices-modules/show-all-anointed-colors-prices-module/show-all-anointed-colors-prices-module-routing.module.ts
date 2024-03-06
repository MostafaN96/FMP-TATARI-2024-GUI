import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllAnointedColorsPricesComponent } from '../../../../main/anointed-colors-prices/show-all-anointed-colors-prices/show-all-anointed-colors-prices.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllAnointedColorsPricesComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllAnointedColorsPricesModuleRoutingModule { }
