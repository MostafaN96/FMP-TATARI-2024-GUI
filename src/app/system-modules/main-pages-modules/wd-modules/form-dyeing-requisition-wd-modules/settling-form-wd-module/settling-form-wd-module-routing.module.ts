import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { SettlingFormWdComponent } from '../../../../../main/wd/form-dyeing-requisition-wd/settling-form-wd/settling-form-wd.component';

export const routes: Routes = [

    {

        path: '', component: SettlingFormWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SettlingFormWdModuleRoutingModule { }
