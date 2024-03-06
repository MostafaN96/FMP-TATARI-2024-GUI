import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllYarnComponent } from '../../../../main/yarn/show-all-yarn/show-all-yarn.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllYarnComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllYarnModuleRoutingModule { }
