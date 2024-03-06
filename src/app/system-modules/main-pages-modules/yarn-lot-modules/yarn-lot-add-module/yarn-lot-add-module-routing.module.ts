import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { YarnLotAddComponent } from 'src/app/main/yarn-lot/yarn-lot-add/yarn-lot-add.component';

export const routes: Routes = [

    {

        path: '', component: YarnLotAddComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class YarnLotAddModuleRoutingModule { }
