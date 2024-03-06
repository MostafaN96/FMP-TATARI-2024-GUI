import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllFabricComponent } from '../../../../main/fabric/show-all-fabric/show-all-fabric.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllFabricComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllFabricModuleRoutingModule { }
