import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddTransitionBetweenIndustriesWbComponent } from '../../../../../main/wb/transition-between-industries-wb/add-transition-between-industries-wb/add-transition-between-industries-wb.component';

export const routes: Routes = [

    {

        path: '', component: AddTransitionBetweenIndustriesWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddTransitionBetweenIndustriesWbModuleRoutingModule { }
