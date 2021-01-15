import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsModule } from './modules/projects/projects.module';
import { PicturesModule } from './modules/pictures/pictures.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { TagsModule } from './modules/tags/tags.module';
import { BeforeAndAfterModule } from './modules/before-and-after/before-and-after.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'projects',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'projects',
        loadChildren: () => ProjectsModule,
      },
      {
        path: 'before-and-after',
        loadChildren: () => BeforeAndAfterModule,
      },
      {
        path: 'tags',
        loadChildren: () => TagsModule,
      },
      {
        path: 'pictures',
        loadChildren: () => PicturesModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
