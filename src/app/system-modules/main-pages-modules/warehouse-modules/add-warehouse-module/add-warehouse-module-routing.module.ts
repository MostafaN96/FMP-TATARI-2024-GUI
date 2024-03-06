import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddWarehouseComponent } from '../../../../main/warehouse/add-warehouse/add-warehouse.component';

export const routes: Routes = [

    {

        path: '', component: AddWarehouseComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddWarehouseModuleRoutingModule { }
