
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { AppToastsComponent } from './app-toasts.component';

export default {
  title: 'AppToastsComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      NgbToastModule,
    ]
  },
  component: AppToastsComponent,
  props: {}
})
