import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllWarehouseComponent } from '../../../../main/warehouse/show-all-warehouse/show-all-warehouse.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllWarehouseComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllWarehouseModuleRoutingModule { }
