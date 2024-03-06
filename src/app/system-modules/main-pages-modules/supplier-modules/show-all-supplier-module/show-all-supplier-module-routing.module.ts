import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllSupplierComponent } from '../../../../main/supplier/show-all-supplier/show-all-supplier.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllSupplierComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllSupplierModuleRoutingModule { }
