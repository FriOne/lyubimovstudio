import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

let checkboxNumnber = 0;

@Component({
  selector: 'ls-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true,
  }],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() checked: boolean;
  @Output() checkedChange = new EventEmitter<boolean>();

  disabled = false;
  id = `checkbox-${checkboxNumnber++}`;

  // eslint-disable-next-line
  private onChange = (checked: boolean) => {};
  private onTouched = noop;

  onCheckboxChange(event) {
    console.log('event', event);
    this.updateValue(event.currentTarget.checked);
  }

  // eslint-disable-next-line
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // eslint-disable-next-line
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(checked: boolean) {
    this.checked = checked;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  updateValue(checked: boolean) {
    this.checked = checked;
    this.onChange(checked);
    this.onTouched();
    this.checkedChange.emit(checked);
  }
}
