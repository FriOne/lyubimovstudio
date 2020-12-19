import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, of, Subscription } from 'rxjs';

import { Project } from '@lyubimovstudio/api-interfaces';

import { ProjectsService } from '../projects.service';

type PageData = {
  page: number;
  pageSize: number;
};

@Component({
  selector: 'ls-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  pageData$ = new BehaviorSubject<PageData>({ page: 0, pageSize: 10});
  page$ = this.pageData$.pipe(map(pageData => pageData.page + 1));
  pageSize$ = this.pageData$.pipe(map(pageData => pageData.pageSize));
  total$ = new BehaviorSubject<number>(0);
  hasMoreThanOnePage$ = combineLatest(this.total$, this.pageData$).pipe(
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

  pageSizeOptions = [10, 20, 50];
  deletedProjects = new Set<number>();

  private pageDataSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit(): void {
    this.pageDataSubscription = this.pageData$
      .pipe(
        switchMap(({ page, pageSize }) => {
          this.loading$.next(true);

          return this.projectsService.fetchProjects(page, pageSize);
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

        projects.splice(projectIndex, 1);

        this.deletedProjects.delete(id);
        this.projects$.next(projects);
      });
  }

  onPageChange(newPage: number) {
    const { page, pageSize } = this.pageData$.getValue();

    if ((newPage - 1) === page) {
      return;
    }

    this.pageData$.next({ page: (newPage - 1), pageSize });
  }

  onPageSizeChange(pageSize: number) {
    this.pageData$.next({ page: 0, pageSize });
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
