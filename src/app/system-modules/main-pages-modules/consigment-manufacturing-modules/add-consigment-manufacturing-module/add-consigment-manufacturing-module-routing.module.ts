import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddConsigmentManufacturingComponent } from 'src/app/main/consigment-manufacturing/add-consigment-manufacturing/add-consigment-manufacturing.component';

export const routes: Routes = [

    {

        path: '', component: AddConsigmentManufacturingComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddConsigmentManufacturingModuleRoutingModule { }
