import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllAnointedServicesComponent } from '../../../../main/anointed-services/show-all-anointed-services/show-all-anointed-services.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllAnointedServicesComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllAnointedServicesModuleRoutingModule { }
