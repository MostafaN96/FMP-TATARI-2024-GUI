import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { YarnLotShowAllComponent } from 'src/app/main/yarn-lot/yarn-lot-show-all/yarn-lot-show-all.component';

export const routes: Routes = [

    {

        path: '', component: YarnLotShowAllComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class YarnLotShowAllModuleRoutingModule { }
