import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreFabricComponent } from '../../../../main/fabric/restore-fabric/restore-fabric.component';

export const routes: Routes = [

    {

        path: '', component: RestoreFabricComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreFabricModuleRoutingModule { }
