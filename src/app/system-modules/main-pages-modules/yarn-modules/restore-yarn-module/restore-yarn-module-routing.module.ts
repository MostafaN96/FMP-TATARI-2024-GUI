import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreYarnComponent } from '../../../../main/yarn/restore-yarn/restore-yarn.component';

export const routes: Routes = [

    {

        path: '', component: RestoreYarnComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreYarnModuleRoutingModule { }
