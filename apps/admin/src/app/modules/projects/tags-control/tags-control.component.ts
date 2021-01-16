import { Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BehaviorSubject, noop } from 'rxjs';
import { debounceTime, finalize, map, switchMap, tap } from 'rxjs/operators';

import { Tag } from '@lyubimovstudio/api-interfaces';

import { TagsService } from '../../tags/tags.service';

@Component({
  selector: 'ls-tags-control',
  templateUrl: './tags-control.component.html',
  styleUrls: ['./tags-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagsControlComponent),
    multi: true,
  }]
})
export class TagsControlComponent implements ControlValueAccessor {
  @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement>;

  tagInputControl = new FormControl('');
  tags: Tag[] = [];
  disabled = false;
  tagsAreloading$ = new BehaviorSubject<boolean>(false);
  filteredTags$ = this.tagInputControl
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.tagsAreloading$.next(true)),
      switchMap(name => this.tagsService
        .fetchTags(name)
        .pipe(
          map(tags => this.removeExistedTags(tags)),
          finalize(() => this.tagsAreloading$.next(false))
        ),
      ),
    );

  private onChange = (tags: Tag[]) => {};
  private onTouched = noop;

  constructor(private tagsService: TagsService) {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(tags: Tag[]) {
    this.tags = tags || [];
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  updateValue(tags: Tag[]) {
    this.tags = tags;
    this.onChange(tags);
    this.onTouched();
  }

  removeExistedTags(tags: Tag[]) {
    return tags.filter(tag => (this.findTagIndex(tag) === -1));
  }

  findTagIndex(tag: Tag) {
    return this.tags.findIndex(existedTag => (tag.id === existedTag.id));
  }

  displayTag = (tag: Tag) => {
    return tag.name;
  }

  onTagSelect(event: MatAutocompleteSelectedEvent) {
    const tag: Tag = event.option.value;

    this.tagsInput.nativeElement.value = '';
    this.tagInputControl.setValue('');
    this.updateValue([...this.tags, tag]);
  }

  onTagRemove(tag: Tag) {
    const tagIndex = this.findTagIndex(tag);
    const newTags = [...this.tags];

    newTags.splice(tagIndex, 1);

    this.updateValue(newTags);
  }
}
