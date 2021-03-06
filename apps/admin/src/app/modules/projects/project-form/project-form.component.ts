import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { ToastsService } from '../../shared/services/toasts.service';
import { ProjectsService } from '../../shared/services/projects.service';

@Component({
  selector: 'ls-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectForm = this.fb.group({
    ruTitle: ['', [Validators.required]],
    enTitle: [''],
    ruDescription: [''],
    enDescription: [''],
    isPublished: [true],
    pictures: [[]],
  });

  id: number;
  id$ = this.route.params.pipe(map(params => params.id));
  isNew$ = this.id$.pipe(map(id => id === 'new'));
  title$ = this.isNew$.pipe(map(isNew => isNew ? 'Новый проект' : 'Редактирование проекта'));
  buttonText$ = this.isNew$.pipe(map(isNew => isNew ? 'Создать' : 'Сохранить'));
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);
  formShouldBeRendered$ = combineLatest(this.loading$, this.error$).pipe(
    map(([loading, error]) => !loading && !error),
    startWith(true),
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
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
      switchMap(id => this.projectsService.fetchProject(id)),
    ).subscribe(
      (project) => {
        const newValue = { pictures: [] };

        for (const valueKey of Object.keys(this.projectForm.value)) {
          newValue[valueKey] = project[valueKey];
        }

        this.projectForm.setValue(newValue);
        this.loading$.next(false);
      },
      (error: HttpErrorResponse) => {
        this.error$.next(error.statusText);
        this.loading$.next(false);
        this.toastsService.showError('Произошла ошибка при загрузке проекта');
      },
    );
  }

  onSubmit() {
    this.projectForm.markAllAsTouched();

    if (this.projectForm.invalid) {
      return;
    }

    const project = this.projectForm.value;

    for (const picture of project.pictures) {
      picture.tags = picture.tags || [];
    }

    this.loading$.next(true);
    this.projectsService
      .saveProject(project, this.id)
      .subscribe(
        () => {
          this.loading$.next(false);

          this.toastsService.showSuccess(`Проект "${project.ruTitle}" успешно сохранен`);

          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error) => {
          this.loading$.next(false);
          this.toastsService.showError(error.message);
        }
      );
  }
}
