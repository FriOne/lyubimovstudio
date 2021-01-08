
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { TagsControlComponent } from './tags-control.component';

export default {
  title: 'TagsControlComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      MatFormFieldModule,
      MatChipsModule,
      MatAutocompleteModule,
    ],
    declarations: [
      SpinnerComponent,
    ],
  },
  component: TagsControlComponent,
  props: {}
})
