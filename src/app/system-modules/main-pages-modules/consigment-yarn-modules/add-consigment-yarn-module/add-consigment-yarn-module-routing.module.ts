import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddConsigmentYarnComponent } from 'src/app/main/consigment-yarn/add-consigment-yarn/add-consigment-yarn.component';

export const routes: Routes = [

    {

        path: '', component: AddConsigmentYarnComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddConsigmentYarnModuleRoutingModule { }
