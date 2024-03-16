import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllPurchaseOrderWaComponent } from 'src/app/main/wa/add-purchase-order-wa/show-all-purchase-order-wa/show-all-purchase-order-wa.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllPurchaseOrderWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllPurchaseOrderWaModuleRoutingModule { }
