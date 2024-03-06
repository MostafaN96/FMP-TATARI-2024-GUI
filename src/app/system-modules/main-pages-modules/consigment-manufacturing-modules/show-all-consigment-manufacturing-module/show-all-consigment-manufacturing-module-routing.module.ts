import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllConsigmentManufacturingComponent } from 'src/app/main/consigment-manufacturing/show-all-consigment-manufacturing/show-all-consigment-manufacturing.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllConsigmentManufacturingComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllConsigmentManufacturingModuleRoutingModule { }
