import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { ProjectsService } from '../projects.service';
import { PicturesService } from '../../pictures/pictures.service';

@Component({
  selector: 'ls-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectForm = this.fb.group({
    id: '',
    ruTitle: ['', [Validators.required]],
    enTitle: '',
    ruDescription: '',
    enDescription: '',
    pictures: [],
  });

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
    private projectsService: ProjectsService,
    private picturesService: PicturesService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.id$.pipe(
      filter(id => id !== 'new'),
      tap(() => this.loading$.next(true)),
      switchMap(id => this.projectsService.fetchProject(id)),
    ).subscribe(
      (project) => {
        const newValue = {};

        for (const valueKey of Object.keys(this.projectForm.value)) {
          newValue[valueKey] = project[valueKey];
        }

        this.projectForm.setValue(newValue);
        this.loading$.next(false);
      },
      (error: Error) => {
        this.error$.next(error.message);
        this.loading$.next(false);
      },
    );
  }

  onSubmit() {
    this.projectForm.markAllAsTouched();

    if (this.projectForm.invalid) {
      return;
    }

    this.loading$.next(true);
    this.projectsService
      .saveProject(this.projectForm.value)
      .subscribe(
        () => {
          this.loading$.next(false);
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error) => {
          this.error$.next(error.message);
          this.loading$.next(false);
        }
      );
  }
}
