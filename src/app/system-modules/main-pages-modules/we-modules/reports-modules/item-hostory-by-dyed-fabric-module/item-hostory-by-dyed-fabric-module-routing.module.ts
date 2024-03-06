import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHostoryByDyedFabricComponent } from '../../../../../main/we/reports/item-hostory-by-dyed-fabric/item-hostory-by-dyed-fabric.component';

export const routes: Routes = [

    {

        path: '', component: ItemHostoryByDyedFabricComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHostoryByDyedFabricModuleRoutingModule { }
