
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { TagsControlComponent } from '../tags-control/tags-control.component';
import { ProjectPictureModalFormComponent } from './project-picture-modal-form.component';

export default {
  title: 'ProjectPictureModalFormComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      MatChipsModule,
      MatDialogModule,
    ],
    declarations: [
      SpinnerComponent,
      TagsControlComponent,
    ],
    providers: [
      {
        provide: MAT_DIALOG_DATA,
        useValue: {
          projectPicture: {
            id: 1,
            ruTitle: 'Test',
            image: { id: 1, name: 'test.jpg' },
          },
        },
      },
      {
        provide: MatDialogRef,
        useValue: {},
      },
    ],
  },
  component: ProjectPictureModalFormComponent,
  props: {}
})
