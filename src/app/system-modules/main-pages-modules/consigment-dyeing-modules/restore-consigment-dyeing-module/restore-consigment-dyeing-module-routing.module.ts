import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreConsigmentDyeingComponent } from 'src/app/main/consigment-dyeing/restore-consigment-dyeing/restore-consigment-dyeing.component';

export const routes: Routes = [

    {

        path: '', component: RestoreConsigmentDyeingComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreConsigmentDyeingModuleRoutingModule { }
