import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsModule } from './modules/projects/projects.module';
import { PicturesModule } from './modules/pictures/pictures.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'projects',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () => ProjectsModule,
        canActivate: [AuthGuard],
      },
      {
        path: 'pictures',
        loadChildren: () => PicturesModule,
        canActivate: [AuthGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
