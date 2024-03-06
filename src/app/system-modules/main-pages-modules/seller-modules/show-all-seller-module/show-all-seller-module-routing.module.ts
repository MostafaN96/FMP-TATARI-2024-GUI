import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllSellerComponent } from '../../../../main/seller/show-all-seller/show-all-seller.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllSellerComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllSellerModuleRoutingModule { }
