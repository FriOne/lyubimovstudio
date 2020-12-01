import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PicturesListComponent } from './pictures-list/pictures-list.component';

const routes: Routes = [
  {
    path: '',
    component: PicturesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PicturesRoutingModule {}
