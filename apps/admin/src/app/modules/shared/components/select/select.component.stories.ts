import { ReactiveFormsModule } from '@angular/forms';
import { text, array, object } from '@storybook/addon-knobs';
import { SelectComponent } from './select.component';

export default {
  title: 'SelectComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
    ]
  },
  component: SelectComponent,
  props: {
    size: array('size', ['sm', 'lg']),
    value: text('value', 'test1'),
    options: object('options', [
      { label: 'Test1', value: 'test1' },
      { label: 'Test2', value: 'test2' },
    ]),
  }
})
