import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllTransitionBetweenIndustriesWbComponent } from '../../../../../main/wb/transition-between-industries-wb/show-all-transition-between-industries-wb/show-all-transition-between-industries-wb.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllTransitionBetweenIndustriesWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllTransitionBetweenIndustriesWbModuleRoutingModule { }
