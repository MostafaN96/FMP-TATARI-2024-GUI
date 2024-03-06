import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { YarnLotRestoreComponent } from 'src/app/main/yarn-lot/yarn-lot-restore/yarn-lot-restore.component';

export const routes: Routes = [

    {

        path: '', component: YarnLotRestoreComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class YarnLotRestoreModuleRoutingModule { }
