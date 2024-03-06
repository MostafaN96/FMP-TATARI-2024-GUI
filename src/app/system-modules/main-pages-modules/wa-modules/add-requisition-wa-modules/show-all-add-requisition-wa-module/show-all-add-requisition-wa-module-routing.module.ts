import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllAddRequisitionWaComponent } from 'src/app/main/wa/add-requisition-wa/show-all-add-requisition-wa/show-all-add-requisition-wa.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllAddRequisitionWaComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllAddRequisitionModuleRoutingModule { }
