import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreConsigmentYarnComponent } from 'src/app/main/consigment-yarn/restore-consigment-yarn/restore-consigment-yarn.component';

export const routes: Routes = [

    {

        path: '', component: RestoreConsigmentYarnComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreConsigmentYarnModuleRoutingModule { }
