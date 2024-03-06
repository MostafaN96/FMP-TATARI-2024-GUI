import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreAnointedServicesComponent } from '../../../../main/anointed-services/restore-anointed-services/restore-anointed-services.component';

export const routes: Routes = [

    {

        path: '', component: RestoreAnointedServicesComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreAnointedServicesModuleRoutingModule { }
