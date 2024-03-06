import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddSellerComponent } from '../../../../main/seller/add-seller/add-seller.component';

export const routes: Routes = [

    {

        path: '', component: AddSellerComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddSellerModuleRoutingModule { }
