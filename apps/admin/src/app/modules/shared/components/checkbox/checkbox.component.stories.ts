import { ReactiveFormsModule } from '@angular/forms';
import { boolean } from '@storybook/addon-knobs';
import { CheckboxComponent } from './checkbox.component';

export default {
  title: 'CheckboxComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
    ]
  },
  component: CheckboxComponent,
  props: {
    checked: boolean('checked', false),
  }
})
