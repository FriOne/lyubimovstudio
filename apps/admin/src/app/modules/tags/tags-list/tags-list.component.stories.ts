
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { TagsListComponent } from './tags-list.component';

export default {
  title: 'TagsListComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
      HttpClientTestingModule,
    ],
    declarations: [
      SpinnerComponent,
    ],
  },
  component: TagsListComponent,
  props: {}
})
