import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHostoryByDyedFabricDetailsComponent } from '../../../../../main/we/reports/item-hostory-by-dyed-fabric-details/item-hostory-by-dyed-fabric-details.component';

export const routes: Routes = [

    {

        path: '', component: ItemHostoryByDyedFabricDetailsComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHostoryByDyedFabricDetailsModuleRoutingModule { }
