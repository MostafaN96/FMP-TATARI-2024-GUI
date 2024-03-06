import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreDeliveryCarComponent } from '../../../../main/delivery-car/restore-delivery-car/restore-delivery-car.component';

export const routes: Routes = [

    {

        path: '', component: RestoreDeliveryCarComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreDeliveryCarModuleRoutingModule { }
