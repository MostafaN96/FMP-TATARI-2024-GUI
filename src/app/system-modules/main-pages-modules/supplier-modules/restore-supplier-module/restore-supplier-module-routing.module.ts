import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreSupplierComponent } from '../../../../main/supplier/restore-supplier/restore-supplier.component';

export const routes: Routes = [

    {

        path: '', component: RestoreSupplierComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreSupplierModuleRoutingModule { }
