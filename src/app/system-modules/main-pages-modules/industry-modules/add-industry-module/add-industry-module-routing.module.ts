import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddIndustryComponent } from '../../../../main/industry/add-industry/add-industry.component';

export const routes: Routes = [

    {

        path: '', component: AddIndustryComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddIndustryModuleRoutingModule { }
