import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreAnointedColorsPricesComponent } from '../../../../main/anointed-colors-prices/restore-anointed-colors-prices/restore-anointed-colors-prices.component';

export const routes: Routes = [

    {

        path: '', component: RestoreAnointedColorsPricesComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreAnointedColorsPricesModuleRoutingModule { }
