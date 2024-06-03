import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { UpdateExchangeRateComponent } from 'src/app/main/exchange-rate/update-exchange-rate/update-exchange-rate.component';

export const routes: Routes = [

    {

        path: '', component: UpdateExchangeRateComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class UpdateExchangeRateModuleRoutingModule { }
