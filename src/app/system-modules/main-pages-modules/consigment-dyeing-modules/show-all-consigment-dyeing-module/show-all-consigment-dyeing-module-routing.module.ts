import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllConsigmentDyeingComponent } from 'src/app/main/consigment-dyeing/show-all-consigment-dyeing/show-all-consigment-dyeing.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllConsigmentDyeingComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllConsigmentDyeingModuleRoutingModule { }
