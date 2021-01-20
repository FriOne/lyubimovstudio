import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

export type Option = string | number | {
  label: string;
  value: string | number;
};

@Component({
  selector: 'ls-select',
  templateUrl: './select.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true,
  }],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() size: 'sm' | 'lg';
  @Input() value: string | number;
  @Input() options: Option[];
  @Output() valueChange = new EventEmitter<string | number>();

  disabled = false;

  private onChange = (value: string | number) => {};
  private onTouched = noop;

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string | number) {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  updateValue(value: string | number) {
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
    this.onTouched();
  }

  onOptionClick(option: Option): void {
    this.updateValue((typeof option === 'object') ? option.value : option);
  }
}
