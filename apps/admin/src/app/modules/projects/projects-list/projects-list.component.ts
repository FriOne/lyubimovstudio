import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, of, Subscription } from 'rxjs';

import { Project } from '@lyubimovstudio/api-interfaces';

import { ProjectsService } from '../projects.service';
import { ToastsService } from '../../shared/services/toasts.service';
import { FormBuilder, FormControl } from '@angular/forms';

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
  filters$ = new BehaviorSubject<Filters>({ page: 0, pageSize: 10, name: '' });
  page$ = this.filters$.pipe(map(pageData => pageData.page + 1));
  pageSize$ = this.filters$.pipe(map(pageData => pageData.pageSize));
  total$ = new BehaviorSubject<number>(0);
  hasMoreThanOnePage$ = combineLatest(this.total$, this.filters$).pipe(
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

  private pageDataSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private toastsService: ToastsService,
  ) {}

  ngOnInit(): void {
    this.pageDataSubscription = this.filters$
      .pipe(
        tap(filters => {
          this.filtersForm.setValue(
            { name: filters.name },
            { emitEvent: false },
          );
        }),
        switchMap(({ page, pageSize, name }) => {
          this.loading$.next(true);

          return this.projectsService.fetchProjects(page, pageSize, name);
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
    this.pageDataSubscription.unsubscribe();
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

  onFiltersSubmit() {
    const { name } = this.filtersForm.value;
    const { pageSize } = this.filters$.getValue();

    this.filters$.next({ page: 0, pageSize, name });
  }

  onPageChange(newPage: number) {
    const { page, pageSize, name } = this.filters$.getValue();

    if ((newPage - 1) === page) {
      return;
    }

    this.filters$.next({ page: (newPage - 1), pageSize, name });
  }

  onPageSizeChange(pageSize: number) {
    const { name } = this.filters$.getValue();

    this.filters$.next({ page: 0, pageSize, name });
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
