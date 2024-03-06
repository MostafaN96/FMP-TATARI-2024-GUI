import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllIndustryComponent } from '../../../../main/industry/show-all-industry/show-all-industry.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllIndustryComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllIndustryModuleRoutingModule { }
