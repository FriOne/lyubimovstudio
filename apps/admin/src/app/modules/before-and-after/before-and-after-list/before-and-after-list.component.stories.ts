import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SelectComponent } from '../../shared/components/select/select.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { BeforeAndAfterListComponent } from './before-and-after-list.component';

export default {
  title: 'BeforeAndAfterListComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      NgbModule,
    ],
    declarations: [
      SpinnerComponent,
      SelectComponent,
    ],
  },
  component: BeforeAndAfterListComponent,
  props: {}
})
