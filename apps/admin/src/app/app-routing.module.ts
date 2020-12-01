import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsModule } from './modules/projects/projects.module';
import { PicturesModule } from './modules/pictures/pictures.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'projects',
  },
  {
    path: 'projects',
    loadChildren: () => ProjectsModule,
  },
  {
    path: 'pictures',
    loadChildren: () => PicturesModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
