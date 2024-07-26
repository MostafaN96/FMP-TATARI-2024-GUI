import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllGradeItemComponent } from 'src/app/main/grade-item/show-all-grade-item/show-all-grade-item.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllGradeItemComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllGradeItemModuleRoutingModule { }
