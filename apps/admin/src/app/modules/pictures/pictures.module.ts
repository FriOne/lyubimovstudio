import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { PicturesRoutingModule } from './pictures-routing.module';
import { PicturesListComponent } from './pictures-list/pictures-list.component';
import { PicturesService } from './pictures.service';
import { PicturePathPipe } from './picture-path.pipe';

@NgModule({
  declarations: [
    PicturesListComponent,
    PicturePathPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PicturesRoutingModule,
  ],
  providers: [PicturesService],
})
export class PicturesModule {}
