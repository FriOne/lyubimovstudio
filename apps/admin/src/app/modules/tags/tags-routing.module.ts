import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagsListComponent } from './tags-list/tags-list.component';

const routes: Routes = [
  {
    path: '',
    component: TagsListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule {}
