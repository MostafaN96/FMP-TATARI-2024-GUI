import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreColorComponent } from 'src/app/main/color/restore-color/restore-color.component';

export const routes: Routes = [

    {

        path: '', component: RestoreColorComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreColorModuleRoutingModule { }
