import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddTransitionBetweenDyersWdComponent } from '../../../../../main/wd/transition-between-dyers-wd/add-transition-between-dyers-wd/add-transition-between-dyers-wd.component';

export const routes: Routes = [

    {

        path: '', component: AddTransitionBetweenDyersWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddTransitionBetweenDyersWdModuleRoutingModule { }
