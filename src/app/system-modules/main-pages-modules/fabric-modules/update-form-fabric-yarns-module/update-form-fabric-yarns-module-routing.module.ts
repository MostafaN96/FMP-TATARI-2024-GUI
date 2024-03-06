import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { UpdateFormFabricYarnsComponent } from 'src/app/main/fabric/update-form-fabric-yarns/update-form-fabric-yarns.component';

export const routes: Routes = [

    {

        path: '', component: UpdateFormFabricYarnsComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class UpdateFormFabricYarnsModuleRoutingModule { }
