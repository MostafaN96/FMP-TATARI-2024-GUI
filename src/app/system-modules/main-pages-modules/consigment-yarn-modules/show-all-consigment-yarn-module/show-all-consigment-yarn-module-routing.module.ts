import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllConsigmentYarnComponent } from 'src/app/main/consigment-yarn/show-all-consigment-yarn/show-all-consigment-yarn.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllConsigmentYarnComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllConsigmentYarnModuleRoutingModule { }
