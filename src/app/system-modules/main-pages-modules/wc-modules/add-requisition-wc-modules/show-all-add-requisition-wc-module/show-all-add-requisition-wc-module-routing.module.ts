import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllAddRequisitionWcComponent } from 'src/app/main/wc/add-requisition-wc/show-all-add-requisition-wc/show-all-add-requisition-wc.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllAddRequisitionWcComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllAddRequisitionWcModuleRoutingModule { }
