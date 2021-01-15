import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeforeAndAfterFormComponent } from './before-and-after-form/before-and-after-form.component';

import { BeforeAndAfterListComponent } from './before-and-after-list/before-and-after-list.component';

const routes: Routes = [
  {
    path: '',
    component: BeforeAndAfterListComponent,
  },
  {
    path: ':id',
    component: BeforeAndAfterFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeforeAndAfterRoutingModule {}
