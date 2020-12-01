import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsService } from './projects.service';
import { ProjectPicturesComponent } from './project-pictures/project-pictures.component';
import { PictureDropzonePreviewComponent } from './picture-dropzone-preview/picture-dropzone-preview.component';

@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectFormComponent,
    ProjectPicturesComponent,
    PictureDropzonePreviewComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
  ],
  providers: [ProjectsService],
})
export class ProjectsModule {}
