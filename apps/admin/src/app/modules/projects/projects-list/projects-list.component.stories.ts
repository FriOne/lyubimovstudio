
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SelectComponent } from '../../shared/components/select/select.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { ProjectsListComponent } from './projects-list.component';

export default {
  title: 'ProjectsListComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
      HttpClientTestingModule,
      RouterTestingModule,
      NgbModule,
    ],
    declarations: [
      SpinnerComponent,
      SelectComponent,
    ],
  },
  component: ProjectsListComponent,
  props: {}
})
