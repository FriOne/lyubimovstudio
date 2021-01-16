import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, of, Subscription } from 'rxjs';

import { Project } from '@lyubimovstudio/api-interfaces';

import { ToastsService } from '../../shared/services/toasts.service';
import { ProjectsService } from '../../shared/services/projects.service';

type Filters = {
  page: number;
  pageSize: number;
  name: string;
};

@Component({
  selector: 'ls-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  params$ = this.route.queryParams.pipe(
    map(params => ({ page: 1, pageSize: 10, name: '',  ...params })),
  );
  page$ = this.params$.pipe(map(params => params.page));
  pageSize$ = this.params$.pipe(map(params => params.pageSize));
  total$ = new BehaviorSubject<number>(0);
  hasMoreThanOnePage$ = combineLatest(this.total$, this.params$).pipe(
    map(([total, { pageSize }]) => (total > pageSize)),
  );

  projects$ = new BehaviorSubject<Project[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  noProjects$ = combineLatest(this.projects$, this.loading$).pipe(
    map(([projects, loading]) => !loading && projects.length === 0),
  );
  hasProjects$ = combineLatest(this.projects$, this.loading$).pipe(
    map(([projects, loading]) => !loading && projects.length > 0),
  );

  filtersForm = this.fb.group({
    name: [''],
  });

  pageSizeOptions = [10, 20, 50];
  deletedProjects = new Set<number>();

  private paramsSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private toastsService: ToastsService,
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.params$
      .pipe(
        tap(filters => {
          this.filtersForm.setValue(
            { name: filters.name },
            { emitEvent: false },
          );
          this.loading$.next(true);
        }),
        switchMap(({ page, pageSize, name }) => {
          return this.projectsService.fetchProjects(page - 1, pageSize, name);
        }),
        catchError(() => of({ rows: [], total: 0 })),
      )
      .subscribe(response => {
        const { rows: projects, total } = response;

        this.loading$.next(false);
        this.total$.next(total);
        this.projects$.next(projects);
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  removeProject(id: number) {
    this.deletedProjects.add(id);

    this.projectsService
      .removeProject(id)
      .subscribe(() => {
        const projects = [...this.projects$.getValue()];
        const projectIndex = projects.findIndex(project => (project.id === id));
        const project = projects[projectIndex];

        projects.splice(projectIndex, 1);

        this.deletedProjects.delete(id);
        this.projects$.next(projects);

        this.toastsService.showSuccess(`Проект "${project.ruTitle}" удален`);
      });
  }

  updateUrlParams(params: Params) {
    return this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  onFiltersSubmit() {
    this.updateUrlParams({ page: 1, name: this.filtersForm.value.name });
  }

  onPageChange(page: number) {
    this.updateUrlParams({ page });
  }

  onPageSizeChange(pageSize: number) {
    this.updateUrlParams({ page: 1, pageSize });
  }

  onRowClick(project: Project) {
    this.router.navigate([project.id], { relativeTo: this.route });
  }

  onRemoveClick(event: MouseEvent, project: Project) {
    event.stopPropagation();

    if (!confirm(`Вы уверены, что хоите удалить проект "${project.ruTitle}"?`)) {
      return;
    }

    this.removeProject(project.id);
  }
}
