import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreSellerComponent } from '../../../../main/seller/restore-seller/restore-seller.component';

export const routes: Routes = [

    {

        path: '', component: RestoreSellerComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreSellerModuleRoutingModule { }
