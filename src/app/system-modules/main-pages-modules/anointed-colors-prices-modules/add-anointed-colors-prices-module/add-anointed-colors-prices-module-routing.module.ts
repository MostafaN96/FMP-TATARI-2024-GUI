import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddAnointedColorsPricesComponent } from '../../../../main/anointed-colors-prices/add-anointed-colors-prices/add-anointed-colors-prices.component';

export const routes: Routes = [

    {

        path: '', component: AddAnointedColorsPricesComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddAnointedColorsPricesModuleRoutingModule { }
