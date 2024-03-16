import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddAddPurchaseOrderWaComponent } from 'src/app/main/wa/add-purchase-order-wa/add-add-purchase-order-wa/add-add-purchase-order-wa.component';

export const routes: Routes = [

    {

        path: '', component: AddAddPurchaseOrderWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddAddPurchaseOrderWaModuleRoutingModule { }
