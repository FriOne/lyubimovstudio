import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TagInputModule } from 'ngx-chips';

import { SharedModule } from '../shared/shared.module';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsService } from './projects.service';
import { ProjectPicturesComponent } from './project-pictures/project-pictures.component';
import { PictureDropzonePreviewComponent } from './picture-dropzone-preview/picture-dropzone-preview.component';
import { ProjectPictureModalFormComponent } from './project-picture-modal-form/project-picture-modal-form.component';

@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectFormComponent,
    ProjectPicturesComponent,
    PictureDropzonePreviewComponent,
    ProjectPictureModalFormComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    DragDropModule,
    ScrollingModule,
    TagInputModule,
    SharedModule,
  ],
  providers: [
    ProjectsService,
  ],
})
export class ProjectsModule {}
