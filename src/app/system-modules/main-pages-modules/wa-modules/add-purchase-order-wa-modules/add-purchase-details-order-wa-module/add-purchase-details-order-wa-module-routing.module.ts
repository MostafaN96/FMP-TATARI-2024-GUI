import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddPurchaseDetailsOrderWaComponent } from 'src/app/main/wa/add-purchase-order-wa/add-purchase-details-order-wa/add-purchase-details-order-wa.component';

export const routes: Routes = [

    {

        path: '', component: AddPurchaseDetailsOrderWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddPurchaseDetailsOrderWaModuleRoutingModule { }
