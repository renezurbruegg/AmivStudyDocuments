// routerConfig.ts

import { Routes, RouterModule } from '@angular/router';
import { LectureTablesComponent } from './lecture-tables/lecture-tables.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';



/**
* Array containing all paths<->Components  the application knows.
*/
const routes: Routes = [
  { path: 'login',
    component: LoginComponent
  },
  { path: 'lecture/:id',
    component: LectureTablesComponent
  }, {
    path: "",
    component: LectureTablesComponent
  }, {
    path: "lecture",
    component: LectureTablesComponent
  }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
