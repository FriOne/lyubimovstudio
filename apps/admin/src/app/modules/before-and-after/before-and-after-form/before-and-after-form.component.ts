import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@lyubimovstudio/api-interfaces';
import { BehaviorSubject, combineLatest } from 'rxjs';
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
  beforeAndAfterForm = this.fb.group({
    ruTitle: [''],
    enTitle: [''],
    ruDescription: [''],
    enDescription: [''],
    isPublished: [true],
    before: [null, [Validators.required]],
    after: [null, [Validators.required]],
    project: ['', [Validators.required, validateObjectAutocomplete]],
  });

  id: number;
  id$ = this.route.params.pipe(map(params => params.id));
  isNew$ = this.id$.pipe(map(id => id === 'new'));
  title$ = this.isNew$.pipe(map(isNew => isNew ? 'Новое "До и После"' : 'Редактирование "До и После"'));
  buttonText$ = this.isNew$.pipe(map(isNew => isNew ? 'Создать' : 'Сохранить'));
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);
  formShouldBeRendered$ = combineLatest(this.loading$, this.error$).pipe(
    map(([loading, error]) => !loading && !error),
    startWith(true),
  );

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
    private fb: FormBuilder,
    private beforeAndAfterService: BeforeAndAfterService,
    private projectsService: ProjectsService,
    private toastsService: ToastsService,
  ) {}

  ngOnInit() {
    this.id$.pipe(
      filter(id => id !== 'new'),
      tap((id) => {
        this.id = id;
        this.loading$.next(true);
      }),
      switchMap(id => this.beforeAndAfterService.fetchBeforeAndAfter(id)),
    ).subscribe(
      (beforeAndAfter) => {
        const newValue = {};

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

    const beforeAndAfter = this.beforeAndAfterForm.value;

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
