import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddFabricComponent } from '../../../../main/fabric/add-fabric/add-fabric.component';

export const routes: Routes = [

    {

        path: '', component: AddFabricComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddFabricModuleRoutingModule { }
