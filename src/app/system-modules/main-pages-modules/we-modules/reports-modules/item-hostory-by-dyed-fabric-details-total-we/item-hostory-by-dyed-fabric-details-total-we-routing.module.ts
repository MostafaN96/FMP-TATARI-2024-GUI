import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ItemHostoryByDyedFabricDetailsTotalWeComponent } from 'src/app/main/we/reports/item-hostory-by-dyed-fabric-details-total-we/item-hostory-by-dyed-fabric-details-total-we.component';

export const routes: Routes = [

    {

        path: '', component: ItemHostoryByDyedFabricDetailsTotalWeComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ItemHostoryByDyedFabricDetailsTotalWeRoutingModule { }
