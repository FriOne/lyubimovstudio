import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TagsRoutingModule } from './tags-routing.module';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagsService } from './tags.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TagsListComponent,
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    TagsService,
  ]
})
export class TagsModule { }
