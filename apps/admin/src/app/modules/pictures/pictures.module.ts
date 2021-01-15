import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PicturesRoutingModule } from './pictures-routing.module';
import { PicturesListComponent } from './pictures-list/pictures-list.component';
import { PicturesService } from './pictures.service';
import { PicturePathPipe } from './picture-path.pipe';
import { SharedModule } from '../shared/shared.module';
import { PictureImageLinkComponent } from './pictures-list/picture-image-link/picture-image-link.component';

@NgModule({
  declarations: [
    PicturesListComponent,
    PicturePathPipe,
    PictureImageLinkComponent,
  ],
  imports: [
    CommonModule,
    PicturesRoutingModule,
    SharedModule,
  ],
  providers: [PicturesService],
})
export class PicturesModule {}
