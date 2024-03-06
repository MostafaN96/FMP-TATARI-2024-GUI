import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreWarehouseComponent } from '../../../../main/warehouse/restore-warehouse/restore-warehouse.component';

export const routes: Routes = [

    {

        path: '', component: RestoreWarehouseComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreWarehouseModuleRoutingModule { }
