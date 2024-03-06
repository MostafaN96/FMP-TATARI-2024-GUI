import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { UpdateManufacturedFabricWbComponent } from 'src/app/main/wb/manufacturing-requisition-wb/update-manufactured-fabric-wb/update-manufactured-fabric-wb.component';

export const routes: Routes = [

    {

        path: '', component: UpdateManufacturedFabricWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class UpdateManufacturedFabricWbModuleRoutingModule { }
