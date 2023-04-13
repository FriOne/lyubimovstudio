import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';

import type { Project } from '@lyubimovstudio/api-interfaces';

import { ToastsService } from '../../shared/services/toasts.service';
import { ProjectsService } from '../../shared/services/projects.service';

@Component({
  selector: 'ls-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  projects$ = new BehaviorSubject<Project[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  total$ = new BehaviorSubject<number>(0);

  params$: Observable<{ page: 1, pageSize: 10, name?: string; [key: string]: unknown }>;
  $page: Observable<number>;
  pageSize$: Observable<number>;
  hasMoreThanOnePage$: Observable<boolean>;
  noProjects$: Observable<boolean>;
  hasProjects$: Observable<boolean>;

  filtersForm = new FormGroup({
    name: new FormControl(''),
  });

  pageSizeOptions = [10, 20, 50];
  deletedProjects = new Set<number>();

  private paramsSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private toastsService: ToastsService,
  ) {
    this.params$ = this.route.queryParams.pipe(map(params => ({ page: 1, pageSize: 10, ...params })));
    this.$page = this.params$.pipe(map(params => params.page));
    this.pageSize$ = this.params$.pipe(map(params => params.pageSize));
    this.hasMoreThanOnePage$ = combineLatest(this.total$, this.params$).pipe(
      map(([total, { pageSize }]) => (total > pageSize)),
    );
    this.noProjects$ = combineLatest(this.projects$, this.loading$).pipe(
      map(([projects, loading]) => !loading && projects.length === 0),
    );
    this.hasProjects$ = combineLatest(this.projects$, this.loading$).pipe(
      map(([projects, loading]) => !loading && projects.length > 0),
    );
  }

  ngOnInit(): void {
    this.paramsSubscription = this.params$
      .pipe(
        tap(filters => {
          this.filtersForm.setValue(
            { name: filters.name ?? '' },
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
