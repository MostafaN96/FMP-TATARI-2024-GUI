import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreConsigmentManufacturingComponent } from 'src/app/main/consigment-manufacturing/restore-consigment-manufacturing/restore-consigment-manufacturing.component';

export const routes: Routes = [

    {

        path: '', component: RestoreConsigmentManufacturingComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreConsigmentManufacturingModuleRoutingModule { }
