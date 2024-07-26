import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreGradeItemComponent } from 'src/app/main/grade-item/restore-grade-item/restore-grade-item.component';

export const routes: Routes = [

    {

        path: '', component: RestoreGradeItemComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreGradeItemModuleRoutingModule { }
