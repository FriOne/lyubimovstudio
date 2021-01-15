import { AbstractControl } from '@angular/forms';

export function validateObjectAutocomplete(control: AbstractControl) {
    return (typeof control.value === 'string')
      ? {
        stringValue: {
          value: control.value,
        },
      }
      : null;
  }
