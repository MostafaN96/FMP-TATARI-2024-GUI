import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddSupplierComponent } from '../../../../main/supplier/add-supplier/add-supplier.component';

export const routes: Routes = [

    {

        path: '', component: AddSupplierComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddSupplierModuleRoutingModule { }
