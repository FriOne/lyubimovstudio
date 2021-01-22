import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import type { Tag } from '@lyubimovstudio/api-interfaces';

import { ToastsService } from '../../shared/services/toasts.service';
import { TagsService } from '../tags.service';

@Component({
  selector: 'ls-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  newTagForm = this.fb.group({ name: [''] });

  tags$ = new BehaviorSubject<Tag[]>([]);
  addingNewTag$ = new BehaviorSubject<boolean>(false);
  loading$ = new BehaviorSubject<boolean>(false);
  noTags$ = combineLatest(this.tags$, this.loading$).pipe(
    map(([tags, loading]) => !loading && tags.length === 0),
  );
  hasTags$ = combineLatest(this.tags$, this.loading$).pipe(
    map(([tags, loading]) => !loading && tags.length > 0),
  );

  deletedTags = new Set<number>();

  constructor(
    private fb: FormBuilder,
    private tagsService: TagsService,
    private toastsService: ToastsService,
  ) {}

  ngOnInit(): void {
    this.loading$.next(true);
    this.tagsService.fetchTags().subscribe((tags) => {
      this.loading$.next(false);
      this.tags$.next(tags);
    })
  }

  removeTag(id: number) {
    this.deletedTags.add(id);

    this.tagsService
      .removeTag(id)
      .subscribe(() => {
        const tags = [...this.tags$.getValue()];
        const tagIndex = tags.findIndex(project => (project.id === id));
        const tag = tags[tagIndex];

        tags.splice(tagIndex, 1);

        this.deletedTags.delete(id);
        this.tags$.next(tags);

        this.toastsService.showSuccess(`Тег "${tag.name}" удален`);
      });
  }

  onRemoveClick(event: MouseEvent, tag: Tag) {
    event.stopPropagation();

    if (!confirm(`Вы уверены, что хоите удалить тег "${tag.name}"?`)) {
      return;
    }

    this.removeTag(tag.id);
  }

  onTagFormSubmit() {
    const { name } = this.newTagForm.value;

    this.newTagForm.setValue({ name: '' });

    this.addingNewTag$.next(true);
    this.tagsService.addNewTag(name)
      .subscribe((tag) => {
        this.tags$.next([...this.tags$.getValue(), tag]);
        this.addingNewTag$.next(false);
        this.toastsService.showSuccess(`Тег "${tag.name}" добавлен`);
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 409) {
          this.toastsService.showError('Такой тег уже существует');
        }
        else {
          this.toastsService.showError('Произошла ошибка при добавлении тега');
        }
      });
  }
}
