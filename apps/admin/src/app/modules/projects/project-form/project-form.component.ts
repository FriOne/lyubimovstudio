import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

import { ProjectPicture } from '@lyubimovstudio/api-interfaces';

import { ToastsService } from '../../shared/services/toasts.service';
import { ProjectsService } from '../../shared/services/projects.service';

@Component({
  selector: 'ls-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectForm = new FormGroup({
    ruTitle: new FormControl('', { validators: [Validators.required] }),
    enTitle: new FormControl(''),
    ruDescription: new FormControl(''),
    enDescription: new FormControl(''),
    isPublished: new FormControl(true),
    pictures: new FormControl<ProjectPicture[]>([]),
  });

  id: number;
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);
  id$: Observable<'new' | string>;
  isNew$: Observable<boolean>;
  title$: Observable<string>;
  buttonText$: Observable<string>;
  formShouldBeRendered$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private toastsService: ToastsService,
  ) {
    this.id$ = this.route.params.pipe(map(params => params.id));
    this.isNew$ = this.id$.pipe(map(id => id === 'new'));
    this.title$ = this.isNew$.pipe(map(isNew => isNew ? 'Новый проект' : 'Редактирование проекта'));
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
      switchMap(id => this.projectsService.fetchProject(id)),
    ).subscribe(
      (project) => {
        const newValue = {
          ruTitle: '',
          enTitle: '',
          ruDescription: '',
          enDescription: '',
          isPublished: true,
          pictures: <ProjectPicture[]>[],
        };

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

    const project = this.projectForm.getRawValue();

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
