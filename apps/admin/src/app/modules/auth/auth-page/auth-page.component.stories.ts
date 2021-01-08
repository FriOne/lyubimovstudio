
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { AuthPageComponent } from './auth-page.component';

export default {
  title: 'AuthPageComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
      RouterTestingModule,
      HttpClientTestingModule,
    ],
    declarations: [
      SpinnerComponent,
    ],
  },
  component: AuthPageComponent,
  props: {}
})
