import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreIndustryComponent } from '../../../../main/industry/restore-industry/restore-industry.component';

export const routes: Routes = [

    {

        path: '', component: RestoreIndustryComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreIndustryModuleRoutingModule { }
