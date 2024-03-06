import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddAnointedServicesComponent } from '../../../../main/anointed-services/add-anointed-services/add-anointed-services.component';

export const routes: Routes = [

    {

        path: '', component: AddAnointedServicesComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddAnointedServicesModuleRoutingModule { }
