import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import type { Project } from '@lyubimovstudio/api-interfaces';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, filter, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';

import { ProjectsService } from '../../shared/services/projects.service';
import { ToastsService } from '../../shared/services/toasts.service';
import { validateObjectAutocomplete } from '../../shared/validators';
import { BeforeAndAfterService } from '../before-and-after.service';

@Component({
  selector: 'ls-before-and-after-form',
  templateUrl: './before-and-after-form.component.html',
  styleUrls: ['./before-and-after-form.component.scss']
})
export class BeforeAndAfterFormComponent implements OnInit {
  beforeAndAfterForm = new FormGroup({
    ruTitle: new FormControl(''),
    enTitle: new FormControl(''),
    ruDescription: new FormControl(''),
    enDescription: new FormControl(''),
    isPublished: new FormControl(true),
    before: new FormControl(null, { validators: [Validators.required] }),
    after: new FormControl(null, { validators: [Validators.required] }),
    project: new FormControl('', { validators: [Validators.required, validateObjectAutocomplete] }),
  });

  id: number;
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);
  id$: Observable<'new' | string>;
  isNew$: Observable<boolean>;
  title$: Observable<string>;
  buttonText$: Observable<string>;
  formShouldBeRendered$: Observable<boolean>;

  projectsAreloading$ = new BehaviorSubject<boolean>(false);
  filteredProjects$ = this.beforeAndAfterForm
    .get('project')
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.projectsAreloading$.next(true)),
      switchMap((name) => this.projectsService
        .fetchProjects(0, 10, name)
        .pipe(
          map(response => response.rows),
          finalize(() => this.projectsAreloading$.next(false))
        ),
      )
    );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private beforeAndAfterService: BeforeAndAfterService,
    private projectsService: ProjectsService,
    private toastsService: ToastsService,
  ) {
    this.id$ = this.route.params.pipe(map(params => params.id));
    this.isNew$ = this.id$.pipe(map(id => id === 'new'));
    this.title$ = this.isNew$.pipe(map(isNew => isNew ? 'Новое "До и После"' : 'Редактирование "До и После"'));
    this.buttonText$ = this.isNew$.pipe(map(isNew => isNew ? 'Создать' : 'Сохранить'));
    this.loading$ = new BehaviorSubject<boolean>(false);
    this.error$ = new BehaviorSubject<string | null>(null);
    this.formShouldBeRendered$ = combineLatest(this.loading$, this.error$).pipe(
      map(([loading, error]) => !loading && !error),
      startWith(true),
    );
  }

  ngOnInit() {
    this.id$.pipe(
      filter(id => id !== 'new'),
      tap((id) => {
        this.id = Number(id);
        this.loading$.next(true);
      }),
      switchMap(id => this.beforeAndAfterService.fetchBeforeAndAfter(id)),
    ).subscribe(
      (beforeAndAfter) => {
        const newValue = {
          ruTitle: '',
          enTitle: '',
          ruDescription: '',
          enDescription: '',
          isPublished: true,
          before: null,
          after: null,
          project: '',
        };

        for (const valueKey of Object.keys(this.beforeAndAfterForm.value)) {
          newValue[valueKey] = beforeAndAfter[valueKey];
        }

        this.beforeAndAfterForm.setValue(newValue);
        this.loading$.next(false);
      },
      (error: HttpErrorResponse) => {
        this.error$.next(error.statusText);
        this.loading$.next(false);
        this.toastsService.showError('Произошла ошибка при загрузке "До и После"');
      },
    );
  }

  displayProject(project: Project) {
     return project?.ruTitle;
  }

  onSubmit() {
    this.beforeAndAfterForm.markAllAsTouched();

    if (this.beforeAndAfterForm.invalid) {
      return;
    }

    const beforeAndAfter = this.beforeAndAfterForm.getRawValue();

    this.loading$.next(true);
    this.beforeAndAfterService
      .saveBeforeAndAfter(beforeAndAfter, this.id)
      .subscribe(
        () => {
          this.loading$.next(false);

          this.toastsService.showSuccess(`"До и После" "${beforeAndAfter.ruTitle}" успешно сохранено`);

          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error) => {
          this.loading$.next(false);
          this.toastsService.showError(error.message);
        }
      );
  }
}
