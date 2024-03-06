import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddDeliveryCarComponent } from '../../../../main/delivery-car/add-delivery-car/add-delivery-car.component';

export const routes: Routes = [

    {

        path: '', component: AddDeliveryCarComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddDeliveryCarModuleRoutingModule { }
