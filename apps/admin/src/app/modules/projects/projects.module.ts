import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SharedModule } from '../shared/shared.module';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectPicturesComponent } from './project-pictures/project-pictures.component';
import { ProjectPictureModalFormComponent } from './project-picture-modal-form/project-picture-modal-form.component';
import { ProjectPictureDropzonePreviewComponent } from './project-picture-dropzone-preview/project-picture-dropzone-preview.component';
import { TagsControlComponent } from './tags-control/tags-control.component';

@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectFormComponent,
    ProjectPicturesComponent,
    ProjectPictureModalFormComponent,
    ProjectPictureDropzonePreviewComponent,
    TagsControlComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    DragDropModule,
    ScrollingModule,
    SharedModule,
  ],
})
export class ProjectsModule {}
