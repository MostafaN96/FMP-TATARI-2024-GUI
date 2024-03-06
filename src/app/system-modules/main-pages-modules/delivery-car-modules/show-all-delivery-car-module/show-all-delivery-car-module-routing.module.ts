import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllDeliveryCarComponent } from '../../../../main/delivery-car/show-all-delivery-car/show-all-delivery-car.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllDeliveryCarComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllDeliveryCarModuleRoutingModule { }
