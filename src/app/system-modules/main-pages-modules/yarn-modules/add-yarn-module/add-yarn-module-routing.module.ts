import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddYarnComponent } from '../../../../main/yarn/add-yarn/add-yarn.component';

export const routes: Routes = [

    {

        path: '', component: AddYarnComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddYarnModuleRoutingModule { }
