import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { SharedModule } from '../shared/shared.module';
import { BeforeAndAfterListComponent } from './before-and-after-list/before-and-after-list.component';
import { BeforeAndAfterFormComponent } from './before-and-after-form/before-and-after-form.component';
import { BeforeAndAfterRoutingModule } from './before-and-after-routing.module';
import { PictureControlComponent } from './picture-control/picture-control.component';
import { PictureDropzonePreviewComponent } from './picture-dropzone-preview/picture-dropzone-preview.component';

@NgModule({
  declarations: [
    BeforeAndAfterListComponent,
    BeforeAndAfterFormComponent,
    PictureControlComponent,
    PictureDropzonePreviewComponent,
  ],
  imports: [
    CommonModule,
    BeforeAndAfterRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    SharedModule,
  ]
})
export class BeforeAndAfterModule {}
